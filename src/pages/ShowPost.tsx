import React from 'react';
import { usePost } from '../store/post-context';

const ShowPost: React.FC = () => {
  const { post } = usePost();

  if (!post) {
    return <div>No post selected</div>;
  }

  return (
    <section>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </section>
  );
};

export default ShowPost;
