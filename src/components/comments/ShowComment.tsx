

/**
 * `ShowComment` is a React component that displays a comment, including its author, content, and replies.
 *
 * This component supports nested comments (replies) and provides a form to add replies to the comment.
 *
 * Props:
 * - `comment` (CommentType): The comment to be displayed, including author information, content, and replies.
 * - `onReplyPosted` (function): A callback function triggered when a reply is posted to refresh the comments.
 *
 * Behavior:
 * - Displays the author's name, content, and a "Reply" button.
 * - Allows the user to reply to the comment by clicking the "Reply" button, which shows a reply form.
 * - Supports nested comments (replies) by recursively rendering child comments.
 * - Provides the ability to delete the comment if the user is the author.
 *
 * @param {object} comment - The comment object to be displayed.
 * @param {function} onReplyPosted - A callback function to refresh comments when a reply is posted.
 * @returns {JSX.Element} The comment, its replies, and a reply form when applicable.
 */


import classes from "./ShowComment.module.css"
import { useState, FormEvent } from 'react'
import { useAuth } from '../../store/auth-context'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import DeleteComment from './DeleteComment'


// export the CommentType so that if needed, can be used later without redefining the type
export type CommentType = {
    id: number,
    author_name: string,
    content: string,
    post_id: number,
    replies: CommentType[],
    username: string
}

type CommentProps = {
    comment: CommentType,
    onReplyPosted: () => void
}

const ShowComment = ({ comment, onReplyPosted } : CommentProps) => {
    const [replyContent, setReplyContent] = useState('');
    const {user} = useAuth()
    const [authorname, setAuthorname] = useState('');
    const { isLoggedIn, setIsLoggedIn} = useAuth();
    const [showReplyForm, setShowReplyForm] = useState(false);

    const [replytext, setreplytext] = useState('Reply');

    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
        if (!showReplyForm){
            setreplytext('Cancel Reply')
        } else {
            setreplytext('Reply')
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
        console.log(replyContent)
        // POST request to create a reply
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${comment.post_id}/comments/${comment.id}/replies`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({comment: { content: replyContent, parent_id: comment.id, user_id: user?.id, author_name: authorname, username: user?.username }})
          });
    
          if (!response.ok) {
            throw new Error('Failed to post reply');
          }
    
          // Clear form and optionally refresh comments
          setReplyContent('');
          toggleReplyForm()
          onReplyPosted()
        } catch (error) {
          console.error('Error posting reply:', error);
        }
      };

      return (
        <div className={classes.comment}>
          <p className={classes.author}>{((!user || user.username !== comment.username) && <Link to = {`/user/${comment.username}`}>{comment.author_name}</Link>) || (<Link to = "/user-data">{comment.author_name}</Link>) }:</p>
          <p>{comment.content}</p>
          {comment.author_name === authorname && <DeleteComment id = {comment.id} postId={comment.post_id} onCommentDeleted={onReplyPosted} /> }

          {user && (
                <div className={classes.buttonarea}><button onClick={toggleReplyForm}>{replytext}</button></div>
            )}
          
          {showReplyForm && (<form onSubmit={handleReplySubmit}>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <div className={classes.buttonarea}><button type="submit">Reply</button></div>
          </form>)}

          <div className={classes.replies}>
            {comment.replies && comment.replies.reverse().map((reply: CommentType) => (
              <ShowComment key={reply.id} comment={reply} onReplyPosted={onReplyPosted} />
            ))}
          </div>
        </div>
      );
    };

export default ShowComment

