import React from 'react'
import classes from './PostItem.module.css'
import Card from '../ui/Card'

import ShowPost from '../../pages/ShowPost'

import { Link } from 'react-router-dom'
import { usePost } from '../../store/post-context'

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
    const { setPost } = usePost();

  return (
    <Card>
        <div className={classes.content}>
            <h3>{postData.title}</h3>
            <p>Author: {postData.author_name}</p>
            <div>
                {postData.tags && postData.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
            </div>
            <p> <Link to ={`/showpost/${postData.id}`} onClick={() => setPost(postData)}> View Post </Link> </p>
        </div>
    </Card>
  )
}

export default PostItem
