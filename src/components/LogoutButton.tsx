// src/components/LogoutButton.tsx
import React from 'react';
import { useAuth } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

import classes from "./UserDataForm.module.css"

const LogoutButton = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/sign_out`, {
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
        navigate('/login'); // Redirect to the login page or home page
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
    <button onClick={handleLogout} className={classes.profileButton}>Logout</button>
  );
};

export default LogoutButton;
