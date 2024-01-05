import React from 'react'
import {Link} from 'react-router-dom';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
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
                        <Link to="/signup">Signup</Link>
                    </li>

                </ul>
            </nav>
        </header>
  )
}

export default MainNavigation
