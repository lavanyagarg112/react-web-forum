import React from 'react'
import NewPostForm from '../components/posts/NewPostForm'
import { useAuth } from '../store/auth-context'

const NewPost = () => {

  const auth = useAuth();

  if (!auth || !auth.isLoggedIn) {
    console.log('not signed in')
    return <p>Please log in to add a new post.</p>;
  }

  return (
    <section>
      <h1>Add New Post</h1>
      <NewPostForm />
    </section>
  )
}

export default NewPost
