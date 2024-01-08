import React, { useRef, FormEvent, useState, useEffect } from 'react';
import Card from '../ui/Card';
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import classes from './NewPostForm.module.css';
import { useAuth } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';


type TagOption = {
    label: string;
    value: number;
  };

const NewPostForm = () => {

    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const [authorname, setAuthorname] = useState('');
    const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    let finalname = ''

    useEffect(() => {

        const fetchTags = async () => {
            try {
              const response = await fetch('http://localhost:3000/tags');
              if (!response.ok) {
                throw new Error('Failed to fetch tags');
              }
              const data = await response.json();
              const tags = data.map((tag: any) => ({
                label: tag.name,
                value: tag.id
              }));
              setAvailableTags(tags);
            } catch (error) {
              console.error('Error fetching tags:', error);
            }
          };
      
          fetchTags();

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

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const enteredTitle = titleInputRef.current?.value;
        const enteredDescription = descriptionInputRef.current?.value;

        const newTags = selectedTags.filter(tag => !availableTags.some(availableTag => availableTag.value === tag.value)).map(tag => tag.label); // Assuming new tags have label as their name

        const existingTagIds = selectedTags.filter(tag => availableTags.some(availableTag => availableTag.value === tag.value)).map(tag => tag.value);
        
        console.log(newTags)
        console.log(existingTagIds)
        const postData = {
          title: enteredTitle,
          author_name: authorname,
          description: enteredDescription,
          user_id: user?.id,
          tag_ids: existingTagIds,
          new_tags: newTags
        };
    
        try {
          const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const responseData = await response.json();
          console.log(responseData);
          navigate("/");
        } catch (error) {
          console.error(error);
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

                <CreatableSelect
                    isMulti
                    options={availableTags}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => setSelectedTags(selectedOptions as TagOption[])}
                    value={selectedTags}

                    required
                />

                <div className={classes.actions}>
                    <button>Add Post</button>
                </div>

            </form>

        </Card>
  )
}

export default NewPostForm
