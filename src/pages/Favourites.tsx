import React from 'react'

import { useAuth } from '../store/auth-context'

import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

import PostItem from '../components/posts/PostItem'

type Post = {
  id: number,
  title: string,
  author_name: string,
  description: string,
  tags?: { id: number; name: string }[];
}

const Favourites = () => {
  const auth = useAuth();

  const [favoritePosts, setFavoritePosts] = useState([]);

  const fetchFavoritePosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers like authentication tokens
        },
        // Include credentials if your API requires authentication
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFavoritePosts(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchFavoritePosts();
  }, [auth.isLoggedIn]);

  if (!auth || !auth.isLoggedIn) {
    console.log('not signed in')
    return <p>Please <Link to="/login">log in</Link> to view favourites.</p>;
  }

  return (
    <section>
      <h1>Favourite Posts</h1>
      {favoritePosts && favoritePosts.map((post: Post) => (
          <PostItem key={post.id} postData = {post} onFavoriteChange={fetchFavoritePosts} />
        ))}
    </section>
  )
}

export default Favourites
