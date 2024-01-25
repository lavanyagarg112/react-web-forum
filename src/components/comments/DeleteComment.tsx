
/**
 * `DeleteComment` is a React component that provides a link to delete a comment.
 *
 * This component is used to confirm and initiate the deletion of a comment when the user clicks the "Delete Comment" link.
 *
 * Props:
 * - `id` (number): The unique identifier of the comment to be deleted (comment ID).
 * - `postId` (number): The unique identifier of the post to which the comment belongs (post ID).
 * - `onCommentDeleted` (function): A callback function triggered after successfully deleting the comment to refresh the comments.
 *
 * Behavior:
 * - Displays a link with the text "Delete Comment."
 * - When the link is clicked, a confirmation dialog is shown to confirm the deletion.
 * - If the user confirms the deletion, a DELETE request is sent to the server to delete the comment.
 * - After successful deletion, the `onCommentDeleted` callback is called to refresh the comments.
 *
 * @param {number} id - The comment ID to be deleted.
 * @param {postId} postId - The post ID to which the comment belongs.
 * @param {function} onCommentDeleted - A callback function to refresh comments after deletion.
 * @returns {JSX.Element} A link to delete the specified comment.
 */

import classes from "./DeleteComment.module.css"

const DeleteComment = ({id, postId, onCommentDeleted}: {id: number, postId: number, onCommentDeleted: () => void}) => {
    const deletePosthandler =  async (comId: number) => {

        // Confirm before deleting
        if(window.confirm('Are you sure you want to delete this comment?')) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${comId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (response.ok) {
            console.log('Post deleted successfully');
            onCommentDeleted()
            } else {
            console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }
        
    };

  
    return (
        <p className={classes.linkstyle} onClick={() => deletePosthandler(id)}>Delete Comment</p>
    )
  }
export default DeleteComment
