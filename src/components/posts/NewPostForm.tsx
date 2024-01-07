import React from 'react'
import Card from '../ui/Card'

import { useRef, FormEvent } from 'react';
import classes from './NewPostForm.module.css'

import { useState } from 'react';
import { useEffect } from 'react';

import { useAuth } from '../../store/auth-context';

import { useNavigate } from 'react-router-dom';

const NewPostForm = () => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    
    const [authorname, setAuthorname] = useState('');
    const { user } = useAuth();

    const navigate = useNavigate()

    let finalname = ''

    useEffect(() => {
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
        }
        };

        fetchCurrentDisplayName();

      }, []);

      finalname = authorname
      if (!authorname && user?.username){
        finalname = user?.username
    }

    const submitHandler = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if (!titleInputRef.current || !descriptionInputRef.current) {
            console.error('Form not fully initialized');
            return;
        }

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

    
        // Example POST data
        const postData = {
            title: enteredTitle,
            author_name: finalname,
            description: enteredDescription,
            user_id: user?.id

            
        };
    
        // Send POST request to your API endpoint
        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                body: JSON.stringify(postData),
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers, like authorization tokens
                },
            });
    
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            // Handle the response here
            const responseData = await response.json();
            console.log(responseData);
            navigate("/")
        } catch (error) {
            console.error(error);
            // Handle error here
        }
    };

  return (
    <Card>

            <form className={classes.form} onSubmit={submitHandler}>

                <p>Display Name: {finalname}</p>

                <div className={classes.control}>
                    <label htmlFor="title">Post Title</label>
                    <input type="text" required id="title" ref={titleInputRef} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" required rows = {5} ref={descriptionInputRef}></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Add Post</button>
                </div>

            </form>

        </Card>
  )
}

export default NewPostForm
