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
import { getPosts } from '../../Actions/postAction';
import CreatePost from '../Post/CreatePost/CreatePost';
import { useNavigate } from 'react-router-dom';

import EditPostModal from '../Post/EditPost/EditPostJModal';
import { Modal } from '@mui/material';

// import { getPosts } from "../../actions/posts";



function Home() {
    const [currentId, setCurrentId] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    // dispatch(getPosts())
    const posts = useSelector((state)=>state.posts)
    // const editModalConfig = () =>{
    //     setOpenModal(false)
    // }

    
    return (
        <Container className={classes.Container} disableGutters={true} maxWidth='false'>
            <Navbar  />
            <Grid container justifyContent="space-between" alignItem="strech" spacing={3} >
                <Grid item xs={0} sm={1} md={2} />
                <Grid item xs={12} sm={10} md={8}>
                    <CreatePost />
                    <Grid className={classes.Post}>
                        <Post setCurrentId={setCurrentId} setOpenModal={setOpenModal} />
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={1} md={2} />
             
                
                {/* ERROR MAXIMUM CALLSTACK BECAUSE MULTIPLE POST CALLING TRUE */}
                {/* SOLUTION: SEARCH HOW TO CALL ONLY FROM 1 Post */}
                {/* <EditPostModal currentId={currentId} show={currentId===currentId?true:false} close={()=>setOpenModal(false)} /> */}
                <EditPostModal currentId={currentId} show={openModal} close={()=>setOpenModal(false)} />
               
            </Grid>
        </Container>
    )
}

export default Home