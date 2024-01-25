/**
 * `UserPosts` is a React component that displays a list of posts created by a specific user.
 *
 * Props:
 * - `username` (string): The username of the user for whom the posts will be displayed.
 *
 * Behavior:
 * - Fetches the posts created by the specified user using an API request.
 * - Displays a list of post items, each representing a post created by the user.
 * - If there are no posts, it displays a message indicating that no posts have been created yet.
 *
 * @param {string} username - The username of the user for whom the posts will be displayed.
 * @returns {JSX.Element} A list of post items created by the specified user or a message if no posts exist.
 */

import { useState, useEffect } from 'react';
import PostItem from './PostItem';
import { PostData } from '../../store/PostType';

const UserPosts = ({username}: {username: string}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Function to fetch posts
    const fetchPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}/posts`);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);



  return (
    <div>
          {posts.length > 0 && posts.reverse().map((post: PostData) => 
                <PostItem 
                    key={post.id} 
                    postinfo = {post}
                /> 
            )}
            {posts.length === 0 && <p>No posts created yet</p>}
      
    </div>
  )
}


export default UserPosts
