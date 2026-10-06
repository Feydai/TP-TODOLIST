import { createContext, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const data = await authService.login(email, password);

    localStorage.setItem('token', data.token);
    setUser(data.user);

    return data;
  };

  const register = async (email, password) => {
    const data = await authService.register(email, password);

    localStorage.setItem('token', data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};