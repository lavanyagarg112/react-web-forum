import React from 'react'
import classes from './PostList.module.css'

import PostItem from './PostItem'

type Post = {
    id: number,
    title: string,
    description: string
}

type PostListProps = {
    allposts: Post[];
  };
  

const PostList = ({allposts}: PostListProps) => {
  return (
    <ul className={classes.list}>
            {allposts.map((post: Post) => 
                <PostItem 
                    key={post.id} 
                    postData = {post}
                /> 
            )}
        </ul>
  )
}

export default PostList
