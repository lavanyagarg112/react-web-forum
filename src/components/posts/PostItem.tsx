import React from 'react'
import classes from './PostItem.module.css'
import Card from '../ui/Card'

type Props = {
    key: number,
    id: number,
    title: string,
    description: string
}

const PostItem = ({key, id, title, description}:Props) => {
  return (
    <Card>
        <div className={classes.content}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </Card>
  )
}

export default PostItem
