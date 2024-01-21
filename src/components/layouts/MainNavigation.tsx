import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useAuth } from '../../store/auth-context';

const MainNavigation = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const auth = useAuth();
  let message = "Sign Up";
  let link = "/signup";

  if (auth && auth.isLoggedIn) {
    message = "My Profile";
    link = "/user-data";
  }

  const toggleMenuHandler = () => {
    setMenuIsOpen(prevState => !prevState);
  };

  return (
    <header className={`${classes.header} ${menuIsOpen ? classes['menu-open'] : ''}`}>
      <div className={classes.logo}><Link to="/">Thread Talk</Link></div>
      <div className={classes.hamburger} onClick={toggleMenuHandler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav>
        <ul>
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
