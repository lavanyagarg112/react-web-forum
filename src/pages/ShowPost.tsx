import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import classes from "./ShowPost.module.css"

import { useAuth } from '../store/auth-context';

import DeletePost from '../components/posts/DeletePost';
import { Link } from 'react-router-dom';

type TagType = {
  id: number,
  name: string;
};

type PostData = {
  id: number;
  title: string;
  author_name: string;
  description: string;
  tags: TagType[];
};

const ShowPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [authorname, setAuthorname] = useState('');
  const { isLoggedIn, setIsLoggedIn} = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

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
  }, [id]);

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

  

  if (!post) {
    return <div>No Post Found</div>;
  }

  return (
    <div className={classes.showPostContainer}>
      <h1 className={classes.showPostHeader}>{post.title}</h1>
      <p className={classes.showPostAuthor}>Written By: {post.author_name}</p>
      <div className={classes.showPostTags}>
        {post.tags && post.tags.map(tag => 
          <span className={classes.showPostTag} key={tag.id}> {tag.name} </span>
        )}
      </div>
      <p className={classes.showPostDescription}>{post.description}</p>
      {user && authorname === post.author_name && (
        <DeletePost id = {post.id} />
      )}
      {user && authorname === post.author_name && (
        <Link to={`/editpost/${id}`}>Edit Post</Link>
      )}
    </div>
  );
};

export default ShowPost;
