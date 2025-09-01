import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

const API_URL = 'http://localhost:5000/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('adminUser');
      if (savedUser) {
        const parsedUser: User = JSON.parse(savedUser);
        if (parsedUser && parsedUser.token) {
          setUser(parsedUser);
          setToken(parsedUser.token);
        }
      }
    } catch (error) {
      console.error("Falha ao processar usuário salvo:", error);
      localStorage.removeItem('adminUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setIsLoading(false);
        return { success: false, error: 'Email ou senha incorretos' };
      }

      const data = await response.json();
      const loggedInUser: User = { ...data.user, token: data.token };

      setUser(loggedInUser);
      setToken(data.token);
      localStorage.setItem('adminUser', JSON.stringify(loggedInUser));
      
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Erro de conexão ao tentar fazer login:', err);
      setIsLoading(false);
      return { success: false, error: 'Falha ao conectar com o servidor' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('adminUser');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};