import React from 'react'
import PostList from '../components/posts/PostList'

const DUMMY_DATA = [
    {
        id: 1,
        title: "hi",
        description: "my first post"
    }
]

const AllPosts = () => {
  return (
    <section>
      <h1>AllPosts</h1>
      <PostList allposts = {DUMMY_DATA} />    
    </section>
  )
}

export default AllPosts
