import {  Grid} from '@material-ui/core'
import React,{ useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getPosts,getPostsProfile  } from '../../Actions/postAction';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'
import CircularProgress from '@mui/material/CircularProgress';

const Post = ({setCurrentId,setOpenModalEditPost,setOpenModalComment, setSkipId, isProfile}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts)
  const userData = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (isProfile) {
      dispatch(getPostsProfile(userData.id));
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, isProfile]);


  return (
        !posts.length ?<h1 style={{textAlign: "center"}}>Loading <CircularProgress /></h1>:(
          <>
          { 
            isProfile?
              posts.map((postData)=>(
                <Grid key={postData.Id} className={classes.PostContainer} container  justifyContent="center">
                  <PostCard post={postData} setCurrentId={setCurrentId} setOpenModalEditPost={setOpenModalEditPost} setOpenModalComment={setOpenModalComment} setSkipId={setSkipId} />
                </Grid>
                ))
            :
              posts.map((postData)=>(
                <Grid key={postData.Id} className={classes.PostContainer} container  justifyContent="center">
                  <PostCard post={postData} setCurrentId={setCurrentId} setOpenModalEditPost={setOpenModalEditPost} setOpenModalComment={setOpenModalComment} setSkipId={setSkipId} />
                </Grid>
                ))
            } 
          </>
        )
    )
}

export default Post

