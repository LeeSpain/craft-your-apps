
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Mock user data for demo purposes
const DEMO_USER = {
  id: '1',
  email: 'client@example.com',
  name: 'Demo Client',
  company: 'Demo Company',
  role: 'client',
};

// Demo credentials - in real app this would be in a secure database
const DEMO_CREDENTIALS = {
  email: 'client@example.com',
  password: 'password123',
};

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
          setUser(DEMO_USER);
          localStorage.setItem('user', JSON.stringify(DEMO_USER));
          toast({
            title: "Login successful",
            description: `Welcome back, ${DEMO_USER.name}!`,
          });
          setIsLoading(false);
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Try using client@example.com / password123",
            variant: "destructive",
          });
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
