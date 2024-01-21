import { useState, FormEvent } from 'react'

import { useAuth } from '../../store/auth-context';

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import classes from "./ShowComment.module.css"

import React from 'react'

const CommentForm = ({id, onCommentPosted} : {id: number, onCommentPosted: () => void}) => {
    const [replyContent, setReplyContent] = useState('');
    console.log(id)
    const {user} = useAuth()
    const navigate = useNavigate();

    const [authorname, setAuthorname] = useState('');
    const { isLoggedIn, setIsLoggedIn} = useAuth();

    const [showCommentForm, setShowCommentForm] = useState(false);

    const [commenttext, setcommenttext] = useState('Add Comment');

    const toggleCommentForm = () => {
        setShowCommentForm(!showCommentForm);
        if (!showCommentForm){
            setcommenttext('Cancel Comment')
        } else {
            setcommenttext('Add Comment')
        }
      };

    useEffect(() => {
        if (isLoggedIn){
            // Fetch the current display name when the component mounts
            const fetchCurrentDisplayName = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/current_user_data`, {
                // credentials: 'include', // to include the authentication cookie
                });
                if (response.ok) {
                const data = await response.json();
                setAuthorname(data.authorname); // Assuming the attribute is named 'authorname'
                }
            } catch (error) {
                console.error('Failed to fetch current display name:', error);
                console.log(authorname)
            }
            };
    
            fetchCurrentDisplayName();
        }
      }, [isLoggedIn]);

    const handleReplySubmit = async (event:FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        // POST request to create a reply
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/comments/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add authentication headers if needed
            },
            body: JSON.stringify({comment: { content: replyContent, user_id: user?.id, author_name: authorname, username: user?.username }})
          });
    
          if (!response.ok) {
            throw new Error('Failed to post reply');
          }
    
          // Clear form and optionally refresh comments
          setReplyContent('');
          toggleCommentForm()
          onCommentPosted()
          
        } catch (error) {
          console.error('Error posting reply:', error);
        }
      };
  return (
    <div className={classes.comment}>
        {user && (
                <div className={classes.buttonarea}><button onClick={toggleCommentForm}>{commenttext}</button></div>
            )}
        {showCommentForm && (<form onSubmit={handleReplySubmit}>
                <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
                <div><button type="submit">Add Comment</button></div>
              </form>)}
    </div>
  )
}

export default CommentForm
