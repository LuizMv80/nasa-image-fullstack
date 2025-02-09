import { createContext, useState } from 'react';
import { AuthContextType, AuthProviderProps } from './authContextInterfaces';


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Usamos sessionStorage para manejar el token
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token') || null);

  const login = (newToken: string) => {
    sessionStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
