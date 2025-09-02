import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './page';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock the modules
jest.mock('@/lib/supabase/client');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const mockSignIn = jest.fn();
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signInWithPassword: mockSignIn,
      },
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    mockSignIn.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows user to type in email and password', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password');
  });

  it('calls supabase signInWithPassword on form submit', async () => {
    mockSignIn.mockResolvedValue({ error: null });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('redirects to home page on successful login', async () => {
    mockSignIn.mockResolvedValue({ error: null });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it('displays error message on failed login', async () => {
    const errorMessage = 'Invalid login credentials';
    mockSignIn.mockResolvedValue({ error: { message: errorMessage } });
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});