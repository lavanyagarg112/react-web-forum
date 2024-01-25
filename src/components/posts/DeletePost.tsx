
/**
 * `DeletePost` is a React component that provides a way to delete a post.
 * It displays a confirmation message before deleting the post and handles the deletion process.
 *
 * Props:
 * - `id` (number): The unique identifier of the post to be deleted.
 *
 * Behavior:
 * - When the user clicks on the "Delete Post" link, it shows a confirmation dialog.
 * - If the user confirms the deletion, it sends a DELETE request to the server to delete the post.
 * - If the deletion is successful, it logs a success message and redirects the user to the homepage or the posts list.
 * - If the deletion fails, it logs an error message.
 *
 * Returns:
 * - A clickable link element that triggers the post deletion process.
 *
 * @param {number} id - The ID of the post to be deleted.
 * @returns {JSX.Element} A component that allows the user to delete a post.
 */

import { useNavigate } from 'react-router-dom';
import classes from "./DeletePost.module.css"

const DeletePost = ({id}: {id: number}) => {
    const navigate = useNavigate();
    const deletePosthandler =  async (postId: number) => {

        // Confirm before deleting
        if(window.confirm('Are you sure you want to delete this post?')) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.ok) {
            console.log('Post deleted successfully');
            navigate('/allposts'); // Redirect to the homepage or the posts list
            } else {
            console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }
        
    };

  
    return (
        <p className={classes.linkstyle} onClick={() => deletePosthandler(id)}>Delete Post</p>
    )
  }
export default DeletePost
