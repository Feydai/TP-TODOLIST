import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useAuth from './useAuth.js';
import { AuthContext } from '../context/AuthContext.js';

describe('useAuth', () => {
  it("retourne le contexte d'authentification", () => {
    const value = {
      user: {
        email: 'test@test.com',
      },
      isAuthenticated: true,
    };

    const wrapper = ({ children }) => (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    expect(result.current).toEqual(value);
  });

  it("lève une erreur s'il est utilisé sans AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth doit être utilisé dans AuthProvider');
  });
});
