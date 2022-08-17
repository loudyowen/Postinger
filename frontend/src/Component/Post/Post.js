import { Box } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'



function Post() {
  const classes = useStyles();
 return (
    <Box className={classes.Box}>
        {/* <h1 style={{textAlign:'center'}}>POST PAGE</h1> */}
        <PostCard />
    </Box>
  )
}

export default Post