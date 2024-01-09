import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from "./ShowPost.module.css"

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
    </div>
  );
};

export default ShowPost;
