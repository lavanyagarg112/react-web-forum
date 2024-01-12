import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import classes from "./ShowPost.module.css"

import { useAuth } from '../store/auth-context';

import DeletePost from '../components/posts/DeletePost';
import { Link } from 'react-router-dom';

import ShowComment from '../components/comments/ShowComment';

import { CommentType } from '../components/comments/ShowComment';

import CommentForm from '../components/comments/CommentForm';

import FavoriteButton from '../components/posts/FavoriteButton';

import { TagType, PostData } from '../store/PostType';



const ShowPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [authorname, setAuthorname] = useState('');
  const { isLoggedIn, setIsLoggedIn} = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data: PostData = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error("Failed to load post:", error);
      }
    };

    fetchPost();

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
    
  }, [id]);

  const updateComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

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

  const handleTag = (id: number) => {
    navigate(`/categories?tagId=${id}`)
  }


  if (!post) {
    return <div>No Post Found</div>;
  }

  return (
    <div className={classes.showPostContainer}>
        <h1 className={classes.showPostHeader}>{post.title}</h1>
        <p className={classes.showPostAuthor}>Written By: {post.author_name}</p>
        <div className={classes.showPostTags}>
          {post.tags && post.tags.map(tag =>
            <span className={classes.showPostTag} key={tag.id} onClick={ () => handleTag(tag.id)}> {tag.name} </span>
          )}
        </div>
        <div className={classes.postcontainer}>
          <p className={classes.showPostDescription}>{post.description}</p>
        </div>
        <div className={classes.actionsdiv}>
          {user && authorname === post.author_name && (
            <div className={classes.editPostButton}>
              <Link to={`/editpost/${id}`} className={classes.linkbutton}>Edit Post</Link>
            </div>
      
          )}
          {user && authorname === post.author_name && (
            <DeletePost id = {post.id} />
          )}

        </div>

        <div className={classes.actions}>{user && <FavoriteButton id = {post.id}/>}</div>

        <div className={classes.commentsSection}>
          <h4>Comments</h4>
          {!user && (
            <p>Please <Link to="/login">log in</Link> to add comments and replies.</p>
          )}
          {user && <CommentForm id = {post.id} onCommentPosted={updateComments} />}
          {comments && comments.reverse().map((comment) => (
            <ShowComment key={comment.id} comment={comment} onReplyPosted={updateComments} />
          ))}
        </div>
      </div>
  );
};

export default ShowPost;
