import { Box, Grid } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import CreatePost from './CreatePost/CreatePost';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'



function Post() {
  const classes = useStyles();
 return (
    <Grid container className={classes.PostContainer} >
            <CreatePost />
            <PostCard />
            <PostCard />
            <PostCard />
    </Grid>
  )
}

export default Post