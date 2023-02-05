import { Button, Grid, TextField } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMorePost, getPosts  } from '../../Actions/postAction';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'
import CircularProgress from '@mui/material/CircularProgress';
// import { useInView } from 'react-intersection-observer'
import { InView } from 'react-intersection-observer';

const Post = ({setCurrentId,setOpenModal, setSkipId, isProfile}) => {
  // const [skip,setSkip] = useState(2)
  // const limit = 2
  // const isProfile = isProfile
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts)
  const userData = JSON.parse(localStorage.getItem('profile'))
  const [user, setUser] = React.useState(userData);
  useEffect(()=>{
    dispatch(getPosts());
  },[getPosts]) 

  // infinite load
  // const handleLoadMore = () =>{
  //   console.log("skip data:",skip)
  //   console.log(posts)
  //   if (posts.length == skip){
  //     dispatch(getMorePost(skip))
  //     setSkip(posts.length+1)
  //   }
  // }


  return (

        !posts.length?<h1 style={{textAlign: "center"}}>Loading <CircularProgress /></h1>:(
          <>
          { 
            isProfile?
              posts.map((postData)=>(
                <>
                {
                // postData.UserData.id ==user.id&&
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
           {/* { dispatch(getMorePost(skip)),
            setSkip(skip+2)} */}
              {/* <InView as="div" onChange={handleLoadMore}>
                <h1 style={{textAlign: "center"}}>Loading <CircularProgress /></h1>
              </InView> */}
          </>
        )

       
    )
}

export default Post

// first initial load data with limit 2 and skip 0
// then when reach the end call getPost(limit,skip) -> skip set 2

// resolve create post conflict
// 2 data from backend -> 7,6
// reverse data from backend
// reverse-column in style 