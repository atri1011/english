import '@testing-library/jest-dom'

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));