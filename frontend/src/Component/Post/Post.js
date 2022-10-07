import { Button, Grid } from '@material-ui/core'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMorePost, getPosts  } from '../../Actions/postAction';
import PostCard from './PostCard/PostCard';
import useStyles from './Styles'
import CircularProgress from '@mui/material/CircularProgress';



const Post = ({setCurrentId,setOpenModal}) => {
  const [skip,setSkip] = useState(2)
  // const limit = 2
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts)
  useEffect(()=>{
    dispatch(getPosts());
  },[getPosts]) 
  const handleLoadMore = () =>{
    console.log("skip data:",skip)
    dispatch(getMorePost(skip))
    setSkip(skip+2)
    // if (skip==1) {
    //   setSkip == 
    // }
  }
  console.log(posts.length)
  // console.log(posts)


  return (

        !posts.length?<h1>Loading <CircularProgress /></h1>:(
          <>
          { 
            posts.map((postData)=>(
              <Grid key={postData.Id} className={classes.PostContainer} container  justifyContent="center">
                <PostCard post={postData} setCurrentId={setCurrentId} setOpenModal={setOpenModal} />
              </Grid>
              ))
            } 
            <Button onClick={handleLoadMore} variant="contained" sx={{width: 300}}>
              Load More
            </Button>
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