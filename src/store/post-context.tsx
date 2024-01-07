import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of the post object
interface Post {  
  id: number;
  author_name: string;
  title: string;
  description: string;
  // Add more fields as necessary
}

// Define the type for the context value
interface PostContextType {
  post: Post | null;
  setPost: (post: Post) => void;
}

// Create the context with a default value
const PostContext = createContext<PostContextType | undefined>(undefined);

// Custom hook for using the post context
export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

// Provider component
export const PostProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [post, setPost] = useState<Post | null>(null);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};
