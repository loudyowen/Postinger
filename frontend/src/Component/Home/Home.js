import React,{useState, useEffect} from 'react'
import { 
    Container,
    Grow,
    Grid,
    Box
} from '@material-ui/core';

import useStyles from './Styles'
import { useCookies } from "react-cookie";

import { useDispatch, useSelector } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Post from '../Post/Post';
import CreatePost from '../Post/CreatePost/CreatePost';
import { useNavigate } from 'react-router-dom';

import EditPostModal from '../Post/EditPost/EditPostJModal';
import CommentModal from '../Post/Comment/CommentModal';
import { Modal } from '@mui/material';

import { getMorePost, getPosts  } from '../../Actions/postAction';
import CircularProgress from '@mui/material/CircularProgress';
import { InView } from 'react-intersection-observer';



function Home() {
    const [currentId, setCurrentId] = useState(null);
    const [openModalEditPost, setOpenModalEditPost] = useState(false)
    const [openModalComment, setOpenModalComment] = useState(false)
    const [skipId,setSkipId] = useState({
        skip: 2,
        userId: ""
    })
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.posts)
    const classes = useStyles();
    const handleClose = () => {
        setCurrentId(null)
        setOpenModalEditPost(false)
        setOpenModalComment(false)
    }
    const handleLoadMore = () =>{
        if (posts.length == skipId.skip){
          dispatch(getMorePost(skipId))
          setSkipId({skip: posts.length+1})
        }
      }
    return (
        <Container className={classes.Container} disableGutters={true} maxWidth={false}>
            <Navbar  />
            <Grid container justifyContent="space-between" alignitem="strech" spacing={3} >
                <Grid item xs={false} sm={1} md={1} />
                <Grid item xs={12} sm={10} md={10}>
                    <CreatePost />
                    <Grid className={classes.Post}>
                        <Post setCurrentId={setCurrentId} setOpenModalEditPost={setOpenModalEditPost} setOpenModalComment={setOpenModalComment} setSkipId={setSkipId} isProfile={false} />
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={1} md={1} />
                <EditPostModal setCurrentId={setCurrentId} currentId={currentId} show={openModalEditPost} handleClose={handleClose} />
                <CommentModal show={openModalComment} handleClose={handleClose} />
                {posts.length!=0 && 
                <InView as="div"  onChange={handleLoadMore}>
                    {/* cannot change the position as it make the inview error */}
                    <h1><CircularProgress /></h1>
                </InView>
                }
            </Grid>
        </Container>
        
    )
}

export default Home