import React from 'react'

import { useEffect } from 'react';

import { useState } from 'react';

import classes from "./UserDataForm.module.css"


import UserPosts from './posts/UserPosts';



const UserProfilePage = ({username}: {username: string}) => {

    const [authorname, setAuthorname] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
            const fetchUserInfo= async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}/user_data`, {
                // credentials: 'include', // to include the authentication cookie
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
                });
                if (response.ok) {
                const data = await response.json();
                  setAuthorname(data.authorname); 
                  setBio(data.bio)
    
                console.log(authorname)
                }
            } catch (error) {
                console.error('Failed to fetch info:', error);
                
            }
            };
    
            fetchUserInfo();
        }, [username]);

      
  return (
    <div >
        {!authorname &&  <p>User does not exist</p>}
        {authorname && (<div>
        <h1 className={classes.profileHeader}>User Profile</h1>
        <p>Username: {username}</p>
          <p>Display Name: {authorname}</p>
          <div>
            <p>Bio:</p>
            <p>{bio || "No Bio Yet"}</p>
          </div>
          <h3>Posts by {authorname}</h3>
          <UserPosts username={username} />

        </div>)}
    </div>
  )
}

export default UserProfilePage
