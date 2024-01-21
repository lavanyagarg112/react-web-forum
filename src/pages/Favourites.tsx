import React from 'react'

import { useAuth } from '../store/auth-context'

import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

import PostItem from '../components/posts/PostItem'

import { PostData } from '../store/PostType'

const Favourites = () => {
  const auth = useAuth();

  const [favoritePosts, setFavoritePosts] = useState([]);

  const fetchFavoritePosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/favorites`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Include any necessary headers like authentication tokens
        },
        // Include credentials if your API requires authentication
        // credentials: 'include',
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

  console.log(favoritePosts)

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
      {favoritePosts.length > 0 && favoritePosts.reverse().map((post: PostData) => (
          <PostItem key={post.id} postinfo = {post} onFavoriteChange={fetchFavoritePosts} />
        ))}
      {favoritePosts.length === 0 && <p>No Favourites added yet</p>}
    </section>
  )
}

export default Favourites
