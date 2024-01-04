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

function App() {
  return (
    <Layout>
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<AllPosts />} />
          <Route path='/showpost' element={<ShowPost />} />
          <Route path='/newpost' element={<NewPost />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </Layout>

  );
}

export default App;
