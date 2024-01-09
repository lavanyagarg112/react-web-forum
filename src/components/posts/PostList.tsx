import React from 'react'
import classes from './PostList.module.css'

import PostItem from './PostItem'

type Post = {
    id: number,
    title: string,
    author_name: string,
    description: string,
    tags?: { id: number; name: string }[];
}

type PostListProps = {
    allposts: Post[];
  };

  

const PostList = ({allposts}: PostListProps) => {
  return (
    <div className={classes.grid}>
            {allposts.reverse().map((post: Post) => 
                <PostItem 
                    key={post.id} 
                    postData = {post}
                /> 
            )}
        </div>
  )
}

export default PostList
