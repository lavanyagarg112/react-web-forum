import React, { useState, FormEvent } from 'react';
import LogoutButton from './LogoutButton';

import { useEffect } from 'react';
import { useAuth } from '../store/auth-context';


const UserDataForm = () => {
  const [authorname, setAuthorname] = useState('');
  const { isLoggedIn, setIsLoggedIn} = useAuth();
    const { user } = useAuth();
    console.log("user data: "+ isLoggedIn)
  useEffect(() => {
    if (isLoggedIn){
        // Fetch the current display name when the component mounts
        const fetchCurrentDisplayName = async () => {
        try {
            const response = await fetch('http://localhost:3000/current_user_data', {
            credentials: 'include', // to include the authentication cookie
            });
            if (response.ok) {
            const data = await response.json();
            setAuthorname(data.authorname); // Assuming the attribute is named 'authorname'
            }
        } catch (error) {
            console.error('Failed to fetch current display name:', error);
            console.log(authorname)
        }
        };

        fetchCurrentDisplayName();
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Make API call to backend to save UserData
    // Adjust the URL and request method (POST for create, PUT for update) accordingly
    try {
        const response = await fetch('http://localhost:3000/user_datum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include authentication headers if needed
        },
        body: JSON.stringify({ user_data: {authorname} }),
        credentials: 'include',
        });

        if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setAuthorname(data.authorname);
        } else {
        // Handle errors
        const errorData = await response.json();
        console.error('Error:', errorData);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {user && <p>Username: {user.username}</p>}
        <p>If no display name is set, then your posts/comments will be published only under your username</p>
        <p>Display Name: {authorname}</p>
        <label>Display Name</label>
        <input type="text" value={authorname} onChange={(e) => setAuthorname(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>


  );
};

export default UserDataForm;
