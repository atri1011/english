import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthButton from './AuthButton';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// Mock the modules
jest.mock('@/lib/supabase/client');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthButton', () => {
  const mockSignOut = jest.fn();
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: mockSignOut,
      },
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    mockSignOut.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Login button when there is no session', () => {
    render(<AuthButton session={null} />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('navigates to /login when Login button is clicked', () => {
    render(<AuthButton session={null} />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders Logout button when there is a session', () => {
    render(<AuthButton session={{ user: { id: '123' } }} />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls signOut and refreshes the page when Logout button is clicked', async () => {
    render(<AuthButton session={{ user: { id: '123' } }} />);
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
    
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});