import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AuthProvider from './AuthProvider.jsx';
import useAuth from '../hooks/useAuth.js';
import { authService } from '../services/authService.js';

vi.mock('../services/authService.js', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("commence sans utilisateur lorsqu'il n'y a pas de session", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('restaure utilisateur depuis localStorage', () => {
    const user = {
      email: 'test@test.com',
    };

    localStorage.setItem('user', JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    expect(result.current.user).toEqual(user);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('connecte utilisateur et sauvegarde la session', async () => {
    const data = {
      token: 'token-123',
      user: {
        email: 'test@test.com',
      },
    };

    authService.login.mockResolvedValue(data);

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    let response;

    await act(async () => {
      response = await result.current.login('test@test.com', 'password123');
    });

    expect(authService.login).toHaveBeenCalledWith(
      'test@test.com',
      'password123'
    );

    expect(response).toEqual(data);

    expect(localStorage.getItem('token')).toBe('token-123');

    expect(JSON.parse(localStorage.getItem('user'))).toEqual(data.user);

    expect(result.current.user).toEqual(data.user);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('inscrit utilisateur et sauvegarde la session', async () => {
    const data = {
      token: 'token-register',
      user: {
        email: 'nouveau@test.com',
      },
    };

    authService.register.mockResolvedValue(data);

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    await act(async () => {
      await result.current.register('nouveau@test.com', 'password123');
    });

    expect(authService.register).toHaveBeenCalledWith(
      'nouveau@test.com',
      'password123'
    );

    expect(localStorage.getItem('token')).toBe('token-register');

    expect(result.current.user).toEqual(data.user);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('déconnecte utilisateur', async () => {
    localStorage.setItem('token', 'token-test');

    localStorage.setItem(
      'user',
      JSON.stringify({
        email: 'test@test.com',
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
