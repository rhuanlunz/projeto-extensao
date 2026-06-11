import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const decodeAndSetUser = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      setUser({
        id: decoded.sub,
        name: decoded.name || 'Usuário',
        email: decoded.email || '',
        role: decoded.role || 'student',
      });
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      logout();
    }
  };

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    decodeAndSetUser(token);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      decodeAndSetUser(token);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
