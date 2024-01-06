import React from 'react'
import {Link} from 'react-router-dom';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import { useAuth } from '../../store/auth-context';

const MainNavigation = () => {
const auth = useAuth();
let message = ""
let link = "/"

  if (!auth || !auth.isLoggedIn) {
    message = "Sign Up"
    link = "/signup"
    console.log('not signed in')
  } else {
    message = "Log Out"
    link = "/logout"
  }

  return (
    <header className={classes.header}>
            <div className={classes.logo}><Link to="/">React Web Forum</Link></div>
            <nav>
                <ul>
                    {/* <li><a href="">Some Link</a></li> 
                    dont want <a> cause extra request */}


                    <li>
                        <Link to="/newpost">Add New Post</Link>
                    </li>

                    <li>
                        <Link to="/favourites">My Favourites 
                        </Link>
                    </li>

                    <li>
                        <Link to="/Categories">Categories</Link>
                    </li>

                    <li>
                        <Link to={link}>
                            {message}
                            
                        </Link>
                    </li>

                </ul>
            </nav>
        </header>
  )
}

export default MainNavigation
