import React from 'react'
import { useNavigate } from 'react-router-dom';

import classes from "./DeletePost.module.css"

const DeletePost = ({id}: {id: number}) => {
    const navigate = useNavigate();
    const deletePosthandler =  async (postId: number) => {

        // Confirm before deleting
        if(window.confirm('Are you sure you want to delete this post?')) {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include any necessary authentication headers, such as a bearer token
            },
            });

            if (response.ok) {
            console.log('Post deleted successfully');
            navigate('/'); // Redirect to the homepage or the posts list
            } else {
            console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }
        
    };

  
    return (
        <p className={classes.linkstyle} onClick={() => deletePosthandler(id)}>Delete Post</p>
    )
  }
export default DeletePost