import React from 'react'
import classes from "./ShowComment.module.css"

import { useState, FormEvent } from 'react'

import { useAuth } from '../../store/auth-context'

import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'

import DeleteComment from './DeleteComment'

export type CommentType = {
    id: number,
    author_name: string,
    content: string,
    post_id: number,
    replies: CommentType[]
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

    const [comments, setComments] = useState<CommentType[]>([]);

    const navigate = useNavigate();

    console.log(comment.replies)

    const fetchComments = async () => {
        try {
          const response = await fetch(`http://localhost:3000/posts/${comment.post_id}/comments`);
          if (!response.ok) {
            throw new Error('Failed to fetch comments');
          }
          const data = await response.json();
          setComments(data);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
    
      

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
        console.log(replyContent)
        // POST request to create a reply
        try {
          const response = await fetch(`http://localhost:3000/posts/${comment.post_id}/comments/${comment.id}/replies`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add authentication headers if needed
            },
            body: JSON.stringify({comment: { content: replyContent, parent_id: comment.id, user_id: user?.id, author_name: authorname }})
          });
    
          if (!response.ok) {
            throw new Error('Failed to post reply');
          }
    
          // Clear form and optionally refresh comments
          setReplyContent('');
          onReplyPosted()
        } catch (error) {
          console.error('Error posting reply:', error);
        }
      };

      return (
        <div className={classes.comment}>
          <p>{comment.author_name}: {comment.content}</p>
          {comment.author_name === authorname && <DeleteComment id = {comment.id} postId={comment.post_id} onCommentDeleted={onReplyPosted} /> }
          
          {user && (<form onSubmit={handleReplySubmit}>
            <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button type="submit">Reply</button>
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

