import React from 'react'

import { useEffect } from 'react';
import { useAuth } from '../store/auth-context';

import { useState } from 'react';

import classes from "./UserDataForm.module.css"

import PostItem from './posts/PostItem';

import { PostData } from '../store/PostType';


const UserProfilePage = ({username}: {username: string}) => {

    const [authorname, setAuthorname] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([]);

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
                console.error('Failed to fetch info:', error);
                
            }
            };
    
            fetchUserInfo();
        }, [username]);

        useEffect(() => {
          // Function to fetch posts
          const fetchPosts = async () => {
              try {
                  const response = await fetch(`http://localhost:3000/users/${username}/posts`);
                  if (!response.ok) {
                      throw new Error('Something went wrong!');
                  }
                  const data = await response.json();
                  setPosts(data);
              } catch (error) {
                  console.error(error);
                  // Handle error here, e.g., set error state
              }
          };
  
          fetchPosts();
      }, []);
      
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
          {posts.reverse().map((post: PostData) => 
                <PostItem 
                    key={post.id} 
                    postinfo = {post}
                /> 
            )}

        </div>)}
    </div>
  )
}

export default UserProfilePage
