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

// import { getPosts } from "../../actions/posts";



function Home() {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();


    // useEffect(()=>{
    //     dispatch(getPosts());
    // },[currentId, dispatch]) 
 return (
    // <Grow out>
        <Container className={classes.Container} disableGutters={true}>
            <Navbar />
            <Grid container justifyContent="space-between" alignItem="strech" spacing={3} >
                <Grid item xs={0} sm={1} md={2}>
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <Post />
                </Grid>
                <Grid item xs={0} sm={1} md={2}>
                </Grid>
            </Grid>
        </Container>
    // </Grow>
  )
}

export default Home