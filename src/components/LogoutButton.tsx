// src/components/LogoutButton.tsx
import React from 'react';
import { useAuth } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        credentials: 'include', // This is necessary for including cookies in the request
        headers: {
          'Content-Type': 'application/json',
          // ...any other headers that your server might require
        },
      });

      if (response.ok) {
        // Log the user out on the client side by updating the context
        setIsLoggedIn(false);
        setUser(null); // Clear user data
        navigate('/'); // Redirect to the login page or home page
      } else {
        // Handle any errors, such as displaying a message to the user
        console.error('Logout failed:', response);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
