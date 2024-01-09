import React, { useRef, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../ui/Card';
import CreatableSelect from 'react-select/creatable';
import classes from "./NewPostForm.module.css"
import { useAuth } from '../../store/auth-context';

type TagOption = {
  label: string;
  value: number;
};

const EditPostForm = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for form inputs and tags
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  // Refs for form fields (if needed)
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  // Fetch post and tags data to populate form
  useEffect(() => {
    const fetchPostAndTags = async () => {
      try {
        // Fetch post data
        const postResponse = await fetch(`http://localhost:3000/posts/${id}`);
        const postData = await postResponse.json();
        setPostTitle(postData.title);
        setPostDescription(postData.description);
        setSelectedTags(postData.tags.map((tag: any) => ({ label: tag.name, value: tag.id })));

        // Fetch tags data
        const tagsResponse = await fetch('http://localhost:3000/tags');
        const tagsData = await tagsResponse.json();
        setAvailableTags(tagsData.map((tag: any) => ({ label: tag.name, value: tag.id })));
      } catch (error) {
        console.error('Error fetching post or tags:', error);
      }
    };

    fetchPostAndTags();
  }, [id]);

  // Handler for form submission
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTags = selectedTags.filter(tag => !availableTags.some(availableTag => availableTag.value === tag.value)).map(tag => tag.label); // Assuming new tags have label as their name

    const existingTagIds = selectedTags.filter(tag => availableTags.some(availableTag => availableTag.value === tag.value)).map(tag => tag.value);
        
    console.log(newTags)
    console.log(existingTagIds)
    // Prepare data for updating the post
    const updatedPostData = {
      title: postTitle,
      description: postDescription,
      user_id: user?.id, // Make sure user_id is allowed and handled on the backend
      tag_ids: existingTagIds,
      new_tags: newTags
      // Add logic for new tags if needed
    };

    // Update the post
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPostData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      // Redirect after successful update
      navigate(`/showpost/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Post Title</label>
          <input type="text" id="title" ref={titleInputRef} value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required />
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" ref={descriptionInputRef} rows={5} value={postDescription} onChange={(e) => setPostDescription(e.target.value)} required></textarea>
        </div>

        <CreatableSelect
          isMulti
          options={availableTags}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) => setSelectedTags(selectedOptions as TagOption[])}
          value={selectedTags}
        />

        <div className={classes.actions}>
          <button type="submit">Update Post</button>
        </div>
      </form>
    </Card>
  );
};

export default EditPostForm;
