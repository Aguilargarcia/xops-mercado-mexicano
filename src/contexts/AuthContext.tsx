
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'cliente' | 'marca';
  role?: 'admin';
  brandName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: 'cliente' | 'marca';
  brandName?: string;
  phone: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock users para pruebas
  const mockUsers = [
    {
      id: '1',
      email: 'cliente@test.com',
      password: '123456',
      name: 'Juan Cliente',
      type: 'cliente' as const
    },
    {
      id: '2',
      email: 'marca@test.com',
      password: '123456',
      name: 'Ana Marca',
      type: 'marca' as const,
      role: 'admin' as const,
      brandName: 'Mi Marca Test'
    }
  ];

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulamos llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        console.log('🔐 Login exitoso:', userWithoutPassword);
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    try {
      // Simulamos llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        type: userData.userType,
        role: userData.userType === 'marca' ? 'admin' : undefined,
        brandName: userData.brandName
      };
      
      setUser(newUser);
      console.log('📝 Registro exitoso:', newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    console.log('👋 Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
