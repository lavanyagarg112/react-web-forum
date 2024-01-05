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
        description: string
    }
}

const PostItem = ({postData}: Props) => {
    const { setPost } = usePost();

  return (
    <Card>
        <div className={classes.content}>
            <h3>{postData.title}</h3>
            <p> <Link to ={`/showpost/${postData.id}`} onClick={() => setPost(postData)}> View Post </Link> </p>
        </div>
    </Card>
  )
}

export default PostItem
