
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the type for the authentication context
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void; // Add this line
  user: { id: number; email: string; username: string } | null;
  setUser: (user: { id: number; email: string; username: string } | null) => void; 

}

// Create the authentication context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook for accessing the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

// Define props for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component that manages authentication state
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number; email: string; username: string } | null>(null);

  // Check user's login status on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/logged_in`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
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

  // Create the context value
  const value = { isLoggedIn, setIsLoggedIn, user, setUser };
  console.log(isLoggedIn)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
