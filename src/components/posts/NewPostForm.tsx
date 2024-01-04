import React from 'react'
import Card from '../ui/Card'

import { useRef } from 'react';
import classes from './NewPostForm.module.css'

const NewPostForm = () => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Card>

            <form className={classes.form}>

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
