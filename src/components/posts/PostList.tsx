/**
 * `PostList` is a React component that displays a list of posts in a grid layout.
 *
 * Props:
 * - `allposts` (array of objects): An array of post data to display.
 *   - `id` (number): The unique identifier of the post.
 *   - `title` (string): The title of the post.
 *   - `author_name` (string): The name of the post's author.
 *   - `username` (string): The username of the post's author.
 *   - `tags` (array): An array of tags associated with the post.
 *
 * Behavior:
 * - Renders a grid of post items displaying post titles, authors, tags, and actions.
 *
 * @param {Object[]} allposts - An array of post data to display.
 * @returns {JSX.Element} A grid of post items displaying post titles, authors, tags, and actions.
 */


import classes from './PostList.module.css'
import PostItem from './PostItem'
import { PostData } from '../../store/PostType'


type PostListProps = {
    allposts: PostData[];
  };

  

const PostList = ({allposts}: PostListProps) => {
  return (
    <div className={classes.grid}>
            {allposts.reverse().map((post: PostData) => 
                <PostItem 
                    key={post.id} 
                    postinfo = {post}
                /> 
            )}
        </div>
  )
}

export default PostList
