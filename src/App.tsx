import React from 'react';
import './App.css';

import Layout from './components/layouts/Layout';

import { Route, Routes } from 'react-router-dom';


import AllPosts from './pages/AllPosts';
import Categories from './pages/Categories';
import Favourites from './pages/Favourites';
import Login from './pages/LogIn';
import NewPost from './pages/NewPost';
import ShowPost from './pages/ShowPost';
import Signup from './pages/SignUp';
import LogOut from './pages/LogOut';
import UserDataPage from './pages/UserDataPage';
import { AuthProvider } from './store/auth-context';
import EditPost from './pages/EditPost';
import UserProfile from './pages/UserProfile';

/**
 * `App` is the root component of the application and serves as the entry point for rendering different pages.
 *
 * Behavior:
 * - Configures routing using `react-router-dom`.
 * - Provides authentication context using the `AuthProvider`.
 * - Contains routes for various pages, including login, signup, all posts, show post, edit post, new post, categories, favorites, logout, user data, and user profile.
 *
 * @returns {JSX.Element} The root component of the application.
 */

function App() {
  return (
    <AuthProvider>
      <Layout>
          <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/' element={<AllPosts />} />
              <Route path='/showpost/:id' element={<ShowPost />} />
              <Route path='/editpost/:id' element={<EditPost />} />
              <Route path='/newpost' element={<NewPost />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/favourites' element={<Favourites />} />
              <Route path='/logout' element={<LogOut />} />
              <Route path="/user-data" element={<UserDataPage />} />
              <Route path='/user/:username' element={<UserProfile />} />
          </Routes>
      </Layout>
    </AuthProvider>

  );
}

export default App;
