import React from 'react';
import './App.css';

import Layout from './components/layouts/Layout';
import { PostProvider } from './store/post-context';

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

function App() {
  return (
    <AuthProvider>
      <Layout>
        <PostProvider>
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
          </Routes>
        </PostProvider>
      </Layout>
    </AuthProvider>

  );
}

export default App;
