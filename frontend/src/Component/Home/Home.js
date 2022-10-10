import React,{useState, useEffect} from 'react'
import { 
    Container,
    Grow,
    Grid,
    Box
} from '@material-ui/core';

import useStyles from './Styles'

import { useDispatch, useSelector } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Post from '../Post/Post';
import CreatePost from '../Post/CreatePost/CreatePost';
import { useNavigate } from 'react-router-dom';

import EditPostModal from '../Post/EditPost/EditPostJModal';
import { Modal } from '@mui/material';

import { getMorePost, getPosts  } from '../../Actions/postAction';
import CircularProgress from '@mui/material/CircularProgress';
import { InView } from 'react-intersection-observer';



function Home() {
    const [currentId, setCurrentId] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [skip,setSkip] = useState(2)
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.posts)
    const classes = useStyles();
    const handleClose = () => {
        setCurrentId(null)
        setOpenModal(false)
    }

    const handleLoadMore = () =>{
        console.log("skip data:",skip)
        console.log(posts)
        if (posts.length == skip){
          dispatch(getMorePost(skip))
          setSkip(posts.length+1)
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
                        <Post setCurrentId={setCurrentId} setOpenModal={setOpenModal} setSkip={setSkip}  />
                    </Grid>
                </Grid>
                <Grid item xs={false} sm={1} md={1} />
                <EditPostModal setCurrentId={setCurrentId} currentId={currentId} show={openModal} handleClose={handleClose} />
                {posts.length!=0 && 
                <InView as="div" onChange={handleLoadMore}>
                    <h1>Loading <CircularProgress /></h1>
                </InView>
                }
            </Grid>
        </Container>
        
    )
}

export default Home