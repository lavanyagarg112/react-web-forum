/**
 * `CommentForm` is a React component that provides a form to add comments to a post.
 *
 * This component allows users to enter and submit comments. It also fetches user details and posts comments
 * to the server through a POST request.
 *
 * Props:
 * - `id` (number): The unique identifier of the post to which the comment will be added (post ID).
 * - `onCommentPosted` (function): A callback function triggered after successfully posting a comment to refresh the comments.
 *
 * Behavior:
 * - Displays a button with text "Add Comment" (or "Cancel Comment" when the form is open).
 * - When the button is clicked, it toggles the comment form.
 * - The form includes a textarea for entering the comment content.
 * - After submitting the form, a POST request is sent to the server to add the comment.
 * - Upon successful submission, the form is cleared, and the `onCommentPosted` callback is called to refresh the comments.
 *
 * @param {number} id - The post ID to which the comment will be added.
 * @param {function} onCommentPosted - A callback function to refresh comments after posting a comment.
 * @returns {JSX.Element} A comment form with a textarea to add comments to the specified post.
 */

import { useState, FormEvent } from 'react'
import { useAuth } from '../../store/auth-context';
import { useEffect } from 'react';
import classes from "./ShowComment.module.css"

const CommentForm = ({id, onCommentPosted} : {id: number, onCommentPosted: () => void}) => {
    const [replyContent, setReplyContent] = useState('');
    console.log(id)
    const {user} = useAuth()

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
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  }
                });
                if (response.ok) {
                const data = await response.json();
                setAuthorname(data.authorname);
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
