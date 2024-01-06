// src/components/LogoutButton.tsx
import React from 'react';
import { useAuth } from '../store/auth-context';

const LogoutButton = () => {
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      // Send the logout request to your Rails server
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // ... any other headers your server expects
        },
        credentials: 'include', // Necessary for cookies, if using sessions
      });

      if (response.ok) {
        // Log the user out on the client side by updating the context
        auth.setIsLoggedIn(false); // Update this line with the actual function to update the state

      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
