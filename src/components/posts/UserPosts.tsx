import React from 'react'

import { useState, useEffect } from 'react';
import PostItem from './PostItem';

import { PostData } from '../../store/PostType';

const UserPosts = ({username}: {username: string}) => {
    const [posts, setPosts] = useState([]);

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
            }
        };

        fetchPosts();
    }, []);



  return (
    <div>
          {posts.length > 0 && posts.reverse().map((post: PostData) => 
                <PostItem 
                    key={post.id} 
                    postinfo = {post}
                /> 
            )}
            {posts.length === 0 && <p>No posts created yet</p>}
      
    </div>
  )
}


export default UserPosts
