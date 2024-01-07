// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void; // Add this line
  user: { id: number; email: string; username: string } | null;
  setUser: (user: { id: number; email: string; username: string } | null) => void; 

}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number; email: string; username: string } | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch('http://localhost:3000/logged_in', {
          credentials: 'include',
        });
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
        if (data.logged_in) {
            // Set user details if logged in
            setUser(data.user);
        } else {
            setUser(null);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };

    checkLoggedIn();
  }, []);

  const value = { isLoggedIn, setIsLoggedIn, user, setUser };
  console.log(isLoggedIn)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
