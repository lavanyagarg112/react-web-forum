/**
 * `NewPost` is a React component that provides a page for adding a new post.
 *
 * This component allows a logged-in user to create a new post. If the user is not logged in,
 * it displays a message with a link to the login page.
 *
 * Behavior:
 * - Checks if the user is logged in.
 * - If the user is logged in, it displays a form for adding a new post.
 * - If the user is not logged in, it displays a message with a link to the login page.
 *
 * @returns {JSX.Element} A page for adding a new post or a message prompting the user to log in.
 */

import NewPostForm from '../components/posts/NewPostForm'
import { useAuth } from '../store/auth-context'
import { Link } from 'react-router-dom'

const NewPost = () => {

  const auth = useAuth();

  if (!auth || !auth.isLoggedIn) {
    console.log('not signed in')
    return <p>Please <Link to="/login">log in</Link> to add a new post.</p>;
  }

  return (
    <section>
      <h1>Add New Post</h1>
      <NewPostForm />
    </section>
  )
}

export default NewPost
