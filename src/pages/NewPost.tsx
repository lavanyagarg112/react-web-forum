import React from 'react'
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
