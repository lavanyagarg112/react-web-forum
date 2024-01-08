import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    return <div>Loading post...</div>;
  }

  return (
    <section>
      <h1>{post.title}</h1>
      <p>Written By: {post.author_name}</p>
      <p>{post.description}</p>
      <div>
        <h3>Tags:</h3>
        {post.tags && (
          <ul>
            {post.tags.map(tag => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ShowPost;
