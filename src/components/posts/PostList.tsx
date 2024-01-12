import React from 'react'
import classes from './PostList.module.css'

import PostItem from './PostItem'

import { PostData } from '../../store/PostType'


type PostListProps = {
    allposts: PostData[];
  };

  

const PostList = ({allposts}: PostListProps) => {
  return (
    <div className={classes.grid}>
            {allposts.reverse().map((post: PostData) => 
                <PostItem 
                    key={post.id} 
                    postinfo = {post}
                /> 
            )}
        </div>
  )
}

export default PostList
