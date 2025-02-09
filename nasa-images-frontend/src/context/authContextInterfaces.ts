import { ReactNode } from 'react';


// Definimos el tipo del contexto
export interface AuthContextType {
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
  }


export interface AuthProviderProps {
  children: ReactNode;
}