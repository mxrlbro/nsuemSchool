
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, User } from '../services/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (loginIdentifier: string, password: string) => Promise<User | null>;
  register: (user: Omit<User, 'id' | 'isAdmin'>) => Promise<User | null>;
  logout: () => void;
  updateProfile: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userFound = false;
    
    // Check localStorage for existing session first
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        userFound = true;
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    
    // Also check database current user if not found in localStorage
    if (!userFound) {
      const currentUser = db.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
    
    // Always set loading to false after checking both sources
    setLoading(false);
  }, []);

  const login = async (loginIdentifier: string, password: string) => {
    const loggedInUser = await db.login(loginIdentifier, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    }
    return loggedInUser;
  };

  const register = async (userData: Omit<User, 'id' | 'isAdmin'>) => {
    const newUser = await db.register(userData);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    return newUser;
  };

  const logout = () => {
    db.logout();
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updatedUser: User) => {
    db.updateCurrentUser(updatedUser);
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
