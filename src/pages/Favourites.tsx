import React from 'react'

import { useAuth } from '../store/auth-context'

import { Link } from 'react-router-dom'

const Favourites = () => {
  const auth = useAuth();

  if (!auth || !auth.isLoggedIn) {
    console.log('not signed in')
    return <p>Please <Link to="/login">log in</Link> to view favourites.</p>;
  }

  return (
    <section>
      Favourites
    </section>
  )
}

export default Favourites
