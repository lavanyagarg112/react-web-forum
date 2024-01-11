import React from 'react'
import classes from './PostItem.module.css'
import Card from '../ui/Card'

import { useNavigate } from 'react-router-dom'

import FavoriteButton from './FavoriteButton'

import { useAuth } from '../../store/auth-context'

type Props = {
    postData: {
        id: number,
        title: string,
        author_name: string,
        description: string,
        tags?: { id: number; name: string }[],
        
    }

    onFavoriteChange?: () => void
}

const PostItem = ({postData, onFavoriteChange}: Props) => {
    const navigate = useNavigate();
    const {user} = useAuth()

    const handleTag = (id: number) => {
        navigate(`/categories?tagId=${id}`)
      }

    const handleViewPost = () => {
        navigate(`/showpost/${postData.id}`)
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
                    {user && <FavoriteButton id = {postData.id} onFavoriteChange = {onFavoriteChange} />}
                </div>
            </div>
        </Card>
    // </li>
  )
}

export default PostItem
