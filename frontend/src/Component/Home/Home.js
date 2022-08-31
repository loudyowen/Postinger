import React,{useState, useEffect} from 'react'
import { 
    Container,
    Grow,
    Grid,
    Box
} from '@material-ui/core';

import useStyles from './Styles'

import { useDispatch } from "react-redux";
import Navbar from '../Navbar/Navbar';
import Post from '../Post/Post';
import { getPosts } from '../../Actions/postAction';
import CreatePost from '../Post/CreatePost/CreatePost';
import { useNavigate } from 'react-router-dom';

// import { getPosts } from "../../actions/posts";



function Home() {
    const [currentId, setCurrentId] = useState(null);
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    // dispatch(getPosts())

    
    return (
        // <Grow out>
            <Container className={classes.Container} disableGutters={true} maxWidth='false'>
                <Navbar  />
                <Grid container justifyContent="space-between" alignItem="strech" spacing={3} >
                    <Grid item xs={0} sm={1} md={2}>
                    </Grid>
                    <Grid item xs={12} sm={10} md={8}>
                    <CreatePost />
                        <Grid className={classes.Post}>
                            <Post />
                        </Grid>
                    </Grid>
                    <Grid item xs={0} sm={1} md={2}>
                    </Grid>
                </Grid>
            </Container>
        // </Grow>
    )
}

export default Home