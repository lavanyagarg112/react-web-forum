import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type PostData = {
  id: number;
  title: string;
  author_name: string;
  description: string;
  // include other properties as needed
};

const ShowPost: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Make sure to get the id as a string
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data: PostData = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to load post:", error);
      }
    };

    fetchPost();
  }, [id]); // The effect will re-run if the id changes

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <section>
      <h1>{post.title}</h1>
      <p>Written By: {post.author_name}</p>
      <p>{post.description}</p>
    </section>
  );
};

export default ShowPost;
