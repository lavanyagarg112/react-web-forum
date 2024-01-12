import React from 'react'

import { useEffect } from 'react';
import { useAuth } from '../store/auth-context';

import { useState } from 'react';

import classes from "./UserDataForm.module.css"

const UserProfilePage = ({username}: {username: string}) => {

    const [authorname, setAuthorname] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
            const fetchUserInfo= async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${username}/user_data`, {
                credentials: 'include', // to include the authentication cookie
                });
                if (response.ok) {
                const data = await response.json();
                  setAuthorname(data.authorname); 
                  setBio(data.bio)
    
                console.log(authorname)
                }
            } catch (error) {
                console.error('Failed to fetch current display name:', error);
                console.log(authorname)
            }
            };
    
            fetchUserInfo();
        }, [username]);
      
  return (
    <div>
    <h1 className={classes.profileHeader}>User Profile</h1>
    <p>Username: {username}</p>
      <p>Display Name: {authorname}</p>
      <div>
        <p>Bio:</p>
        <p>{bio || "No Bio Yet"}</p>
      </div>
    </div>
  )
}

export default UserProfilePage
