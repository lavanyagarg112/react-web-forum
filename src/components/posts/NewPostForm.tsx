/**
 * `NewPostForm` is a React component that provides a form to create a new post.
 *
 * This component allows users to enter a post title, description, and tags. It fetches user details and available tags,
 * posts the new post to the server through a POST request, and redirects to the homepage upon successful submission.
 *
 * Behavior:
 * - Displays a form with the following fields:
 *   - Post Title: A text input field for entering the post title.
 *   - Description: A textarea for entering the post description.
 *   - Add Tags: A creatable select input for selecting and creating tags for the post.
 * - Fetches the user's display name and available tags when the component mounts.
 * - Handles form submission by sending a POST request to create a new post on the server.
 * - Tags can be selected from the available tags or created as new tags.
 * - Upon successful submission, the user is redirected to the homepage.
 * 
 * @returns {JSX.Element} A form for creating a new post with fields for title, description, and tags.
 */
import { useRef, FormEvent, useState, useEffect } from 'react';
import Card from '../ui/Card';
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

    useEffect(() => {

        const fetchTags = async () => {
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/tags`);
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/current_user_data`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            // credentials: 'include', // to include the authentication cookie
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
          username: user?.username,
          tag_ids: existingTagIds,
          new_tags: newTags
        };
    
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
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
          navigate("/allposts");
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <Card>

            <form className={classes.form} onSubmit={submitHandler}>

                <p>Display Name: {authorname}</p>

                <div className={classes.control}>
                    <label htmlFor="title">Post Title</label>
                    <input type="text" required id="title" ref={titleInputRef} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" required rows = {5} ref={descriptionInputRef}></textarea>
                </div>

                <div className={classes.control}>
                <label>Add Tags</label>
                  <CreatableSelect
                      isMulti
                      options={availableTags}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedOptions) => setSelectedTags(selectedOptions as TagOption[])}
                      value={selectedTags}
                  />
                </div>

                <div className={classes.actions}>
                    <button>Add Post</button>
                </div>

            </form>

        </Card>
  )
}

export default NewPostForm
