import { useContext } from 'react';
import { AuthContextType } from '../context/authContextInterfaces';
import { AuthContext } from '../context/AuthContext';

// Hook para consumir el contexto
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth have to be used inside of AuthProvider');
    }
    return context;
  };
