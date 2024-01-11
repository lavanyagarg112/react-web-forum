import React from 'react'
import classes from './PostItem.module.css'
import Card from '../ui/Card'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Props = {
    postData: {
        id: number,
        title: string,
        author_name: string,
        description: string,
        tags?: { id: number; name: string }[];
    }
}

const PostItem = ({postData}: Props) => {
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState(false)

    const [favtext, setfavtext] = useState('Add to Favourites')

    const handleTag = (id: number) => {
        navigate(`/categories?tagId=${id}`)
      }

    const handleViewPost = () => {
        navigate(`/showpost/${postData.id}`)
    }

    const handleFavourite = async () => {
        
        const url = `http://localhost:3000/posts/${postData.id}/favorites`;
    const method = isFavourite ? 'DELETE' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if required
        }
        
      });

      if (response.ok) {
        setIsFavourite(!isFavourite);
        if (!isFavourite){
            setfavtext('Remove from Favourites')
        } else {
            setfavtext('Add to Favourites')
        }
      } else {
        // handle errors, such as unauthorized or not found
        throw new Error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    }

  return (
    // <li className={classes.item}>
        <Card>
            <div className={classes.content}>
                <h3>{postData.title}</h3>
                <p>Author: {postData.author_name}</p>
                <div>
                    {postData.tags && postData.tags.map(tag => <span className={classes.showtag} key={tag.id} onClick={ () => handleTag(tag.id)}>{tag.name} </span>)}
                </div>
                <div className={classes.actions}>
                    <button onClick={handleViewPost}>View Post</button>
                    <button onClick={handleFavourite}>{favtext}</button>
                </div>
            </div>
        </Card>
    // </li>
  )
}

export default PostItem
