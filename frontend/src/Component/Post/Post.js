import { Grid } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts  } from '../../Actions/postAction';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'



const Post = ({setCurrentId,setOpenModal}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get item from redux store
  const posts = useSelector((state)=>state.posts)
  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch]) 


  return (
      !posts.length?<h1>Data Still Loading</h1>:(
        <>
        { 
          posts.map((postData)=>(
            <Grid key={postData.Id} className={classes.PostContainer} container  justifyContent="center">
              <PostCard post={postData} setCurrentId={setCurrentId} setOpenModal={setOpenModal} />
            </Grid>
            ))
          }
        </>
      )
    )
}

export default Post