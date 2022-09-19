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




function Home() {
    const [currentId, setCurrentId] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const classes = useStyles();
    const handleClose = () => {
        setOpenModal(false)
    }
    return (
        <Container className={classes.Container} disableGutters={true} maxWidth={false}>
            <Navbar  />
            <Grid container justifyContent="space-between" alignItem="strech" spacing={3} >
                <Grid item xs={0} sm={1} md={1} />
                <Grid item xs={12} sm={10} md={10}>
                    <CreatePost />
                    <Grid className={classes.Post}>
                        <Post setCurrentId={setCurrentId} setOpenModal={setOpenModal} />
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={1} md={1} />
                <EditPostModal setCurrentId={setCurrentId} currentId={currentId} show={openModal} handleClose={handleClose} />
            </Grid>
        </Container>
    )
}

export default Home