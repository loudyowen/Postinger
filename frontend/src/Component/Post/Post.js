import { Box, Grid } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import CreatePost from './CreatePost/CreatePost';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'



function Post() {
  const classes = useStyles();
  //get item from redux store
  const posts = useSelector((state)=>state.posts)

  return (
    !posts.length?<h1>Data Still Loading</h1>:(
      <>
      { 
        posts.map((postData)=>(
          <Grid className={classes.PostContainer} container justifyContent="center">
            <PostCard post={postData} />
          </Grid>
          ))
      }
      </>
    )
    )
}

export default Post