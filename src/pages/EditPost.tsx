/**
 * `EditPost` is a React component responsible for rendering an edit post page.
 *
 * This component checks if the user is logged in and if they are the author of the post
 * before allowing them to edit the post.
 *
 * Behavior:
 * - Fetches the current user's display name when the component mounts if the user is logged in.
 * - Fetches the post data based on the post ID from the route parameter.
 * - Conditionally renders an edit form if the user is logged in and is the author of the post.
 * - Displays appropriate messages if the user is not logged in or is not the author of the post.
 *
 * @returns {JSX.Element} The EditPost component.
 */

import EditPostForm from '../components/posts/EditPostForm'
import { useAuth } from '../store/auth-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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



const EditPost = () => {
    const { user } = useAuth();
    const { isLoggedIn, setIsLoggedIn} = useAuth();
    const [authorname, setAuthorname] = useState('');
    const [post, setPost] = useState<PostData | null>(null);
    const { id } = useParams<{ id: string }>(); 

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

      useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`);
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

  return (
    <div>
        {user && authorname === post?.author_name && (
            <EditPostForm />
          )}

        {!user && (
            <p>Please <Link to="/login">log in</Link> to edit post.</p>
          )}

        {(user && !(authorname === post?.author_name)) && (
            <p>Only post author can edit.</p>
          )}
    </div>
    
  )
}

export default EditPost
