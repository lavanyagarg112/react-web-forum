import React from 'react'
import classes from './PostItem.module.css'
import Card from '../ui/Card'

import { useNavigate } from 'react-router-dom'

import FavoriteButton from './FavoriteButton'

import { useAuth } from '../../store/auth-context'

import { PostData } from '../../store/PostType'

import { Link } from 'react-router-dom'

type Props = {
    postinfo: PostData

    onFavoriteChange?: () => void
}

const PostItem = ({postinfo, onFavoriteChange}: Props) => {
    const navigate = useNavigate();
    const {user} = useAuth()

    const handleTag = (id: number) => {
        navigate(`/categories?tagId=${id}`)
      }

    const handleViewPost = () => {
        navigate(`/showpost/${postinfo.id}`)
    }

    
  return (
    <div className={classes.item}>
        <Card>
            <div className={classes.content}>
                <h3>{postinfo.title}</h3>
                <p>Posted by: {((!user || user.username !== postinfo.username) && <Link to = {`/user/${postinfo.username}`}>{postinfo.author_name}</Link>) || (<Link to = "/user-data">{postinfo.author_name}</Link>) }</p>
                <div>
                    {postinfo.tags && postinfo.tags.map(tag => <span className={classes.showtag} key={tag.id} onClick={ () => handleTag(tag.id)}>{tag.name} </span>)}
                </div>
                <div className={classes.actions}>
                    <button onClick={handleViewPost}>View Post</button>
                    {user && <FavoriteButton id = {postinfo.id} onFavoriteChange = {onFavoriteChange} />}
                </div>
            </div>
        </Card>
     </div>
  )
}

export default PostItem
