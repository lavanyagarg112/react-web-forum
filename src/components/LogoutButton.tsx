/**
 * `LogoutButton` is a React component that provides a button for users to log out of the application.
 *
 *
 * Behavior:
 * - When the button is clicked, it sends a DELETE request to the server to log out the user.
 * - It updates the authentication context on the client side by setting `isLoggedIn` to false and clearing the user data.
 * - After successful logout, it redirects the user to the login page or home page.
 *
 * @returns {JSX.Element} A button that, when clicked, logs the user out of the application.
 */

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
        // credentials: 'include', // This is necessary for including cookies in the request
        headers: {
          'Content-Type': 'application/json',
          // ...any other headers that your server might require
        },
      });

      if (response.ok) {
        // Log the user out on the client side by updating the context
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null); // Clear user data
        navigate('/login'); // Redirect to the login page
      } else {
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
