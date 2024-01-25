/**
 * `MainNavigation` is a React component responsible for rendering the main navigation menu of your application.
 * It provides links to different sections of your web app based on user authentication status.
 *
 * Behavior:
 * - Landing Page
 * - Displays a hamburger menu icon to toggle the mobile menu on smaller screens.
 * - When the mobile menu is open, it overlays the navigation links.
 * - Shows different navigation links based on the user's authentication status:
 *   - If the user is not logged in, it displays links for "Sign Up," "All Posts," "Categories," and "My Favourites."
 *   - If the user is logged in, it displays links for "My Profile" (or "Sign Up" if not authenticated), "All Posts," "Add New Post," "Categories," and "My Favourites."
 * - Clicking on a navigation link will close the mobile menu.
 *
 * Returns:
 * - A header element containing the navigation menu with appropriate links and functionality.
 *
 * @returns {JSX.Element} The main navigation menu of the application with dynamic links based on user authentication status.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useAuth } from '../../store/auth-context';

const MainNavigation = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const auth = useAuth();
  let message = "Sign Up";
  let link = "/signup";

  if (auth && auth.isLoggedIn) {
    message = "My Profile";
    link = "/user-data";
  }

  const toggleHamburger = () => {
    setHamburgerIsOpen(prevState => !prevState);
  }

  const toggleMenuHandler = () => {
    if (hamburgerIsOpen){
      setMenuIsOpen(prevState => !prevState);
    }
    
  };

  return (
    <header className={`${classes.header} ${menuIsOpen && hamburgerIsOpen ? classes['menu-open'] : ''}`}>
      <div className={classes.logo}><Link to="/" onClick={toggleMenuHandler}>Thread Talk</Link></div>
      <div className={classes.hamburger} onClick={toggleHamburger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav>
        <ul>
            <li><Link to="/allposts" onClick={toggleMenuHandler}>All Posts</Link></li>
          <li><Link to="/newpost" onClick={toggleMenuHandler}>Add New Post</Link></li>
          <li><Link to="/favourites" onClick={toggleMenuHandler}>My Favourites</Link></li>
          <li><Link to="/Categories" onClick={toggleMenuHandler}>Categories</Link></li>
          <li><Link to={link} onClick={toggleMenuHandler}>{message}</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
