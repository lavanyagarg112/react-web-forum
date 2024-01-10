import { useState, FormEvent } from 'react'

import { useAuth } from '../../store/auth-context';

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import React from 'react'

const CommentForm = ({id, onCommentPosted} : {id: number, onCommentPosted: () => void}) => {
    const [replyContent, setReplyContent] = useState('');
    console.log(id)
    const {user} = useAuth()
    const navigate = useNavigate();

    const [authorname, setAuthorname] = useState('');
    const { isLoggedIn, setIsLoggedIn} = useAuth();

    useEffect(() => {
        if (isLoggedIn){
            // Fetch the current display name when the component mounts
            const fetchCurrentDisplayName = async () => {
            try {
                const response = await fetch('http://localhost:3000/current_user_data', {
                credentials: 'include', // to include the authentication cookie
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
          const response = await fetch(`http://localhost:3000/posts/${id}/comments/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add authentication headers if needed
            },
            body: JSON.stringify({comment: { content: replyContent, user_id: user?.id, author_name: authorname }})
          });
    
          if (!response.ok) {
            throw new Error('Failed to post reply');
          }
    
          // Clear form and optionally refresh comments
          setReplyContent('');
          onCommentPosted()
          
        } catch (error) {
          console.error('Error posting reply:', error);
        }
      };
  return (
    <form onSubmit={handleReplySubmit}>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button type="submit">Comment</button>
          </form>
  )
}

export default CommentForm
