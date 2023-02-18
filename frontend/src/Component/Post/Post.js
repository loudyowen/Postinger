import { Button, Grid, TextField } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMorePost, getPosts,getPostsProfile  } from '../../Actions/postAction';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'
import CircularProgress from '@mui/material/CircularProgress';
// import { useInView } from 'react-intersection-observer'
import { InView } from 'react-intersection-observer';
import { Typography } from '@mui/material';

const Post = ({setCurrentId,setOpenModal, setSkipId, isProfile}) => {
  // const limit = 2
  // const isProfile = isProfile
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts)
  const userData = JSON.parse(localStorage.getItem('profile'))
  
  const [user, setUser] = React.useState(userData);
  // useEffect(()=>{
  //   dispatch(getPosts())
  // },[getPosts]) 

  useEffect(() => {
    if (isProfile) {
      dispatch(getPostsProfile(userData.id));
    } else {
      dispatch(getPosts());
    }
  }, [dispatch, isProfile]);

  // if(posts==null){
  //   posts.length = 0;
  // }


  return (
        !posts.length ?<h1 style={{textAlign: "center"}}>Loading <CircularProgress /></h1>:(
          <>
          { 
            isProfile?
              posts.map((postData)=>(
                <>
                {
                <Grid key={postData.Id} className={classes.PostContainer} container  justifyContent="center">
                  <PostCard post={postData} setCurrentId={setCurrentId} setOpenModal={setOpenModal} setSkipId={setSkipId} />
                </Grid>
                }
                </>
                ))
            :
              posts.map((postData)=>(
                <Grid key={postData.Id} className={classes.PostContainer} container  justifyContent="center">
                  <PostCard post={postData} setCurrentId={setCurrentId} setOpenModal={setOpenModal} setSkipId={setSkipId} />
                </Grid>
                ))
            } 
          </>
        )
    )
}

export default Post

