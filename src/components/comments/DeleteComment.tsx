import React from 'react'
import { useNavigate } from 'react-router-dom';

import classes from "./DeleteComment.module.css"


const DeleteComment = ({id, postId, onCommentDeleted}: {id: number, postId: number, onCommentDeleted: () => void}) => {
    const deletePosthandler =  async (comId: number) => {

        // Confirm before deleting
        if(window.confirm('Are you sure you want to delete this comment?')) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${comId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include any necessary authentication headers, such as a bearer token
            },
            });

            if (response.ok) {
            console.log('Post deleted successfully');
            onCommentDeleted()
            } else {
            console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }
        
    };

  
    return (
        <p className={classes.linkstyle} onClick={() => deletePosthandler(id)}>Delete Comment</p>
    )
  }
export default DeleteComment
