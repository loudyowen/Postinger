import { Avatar, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../Input/Input'
import Navbar from '../Navbar/Navbar'
import useStyles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import Post from '../Post/Post'
import { getMorePost, getPosts  } from '../../Actions/postAction';
import CircularProgress from '@mui/material/CircularProgress';
import { InView } from 'react-intersection-observer';
function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const posts = useSelector((state)=>state.posts)
    const userData = JSON.parse(localStorage.getItem('profile'))
    const [user, setUser] = React.useState(userData);
    const userId = user.id;
    const [skipId,setSkipId] = useState({
      skip: 2,
      userId: userId 
    })
    const [profile, setProfile] = useState({
      id: user?.id,
      profileImage: user?.profileImage,
      firstName: user?.firstName,
      lastName: user?.lastName,
    })
    console.log("profile: "+skipId.skip)
    const handleLoadMore = () =>{
      console.log("post: "+posts.length)
      if (posts.length == skipId.skip){
        dispatch(getMorePost(skipId))
        setSkipId({skip: posts.length+1})
      }
    }

  return (
    <>
    <Navbar />
        <Container className={classes.container} component="main" maxWidth="md">
            <Paper className={`${classes.paper} ${classes.root}`} elevation={3}>
                <IconButton
                className={classes.profileImage}
                size="large"
                edge="end"
                aria-haspopup="true"
                color="inherit"
                > 
                  <Avatar sx={{ width: 120, height: 120 }} src={profile.profileImage} alt={profile?.firstName}>{profile?.firstName?.charAt(0)}</Avatar>
                </IconButton>
                <Typography variant="h4">{ profile?.firstName} {profile?.lastName}</Typography>
            </Paper>
            <Post isProfile={true}/>
            {posts.length!=0 && 
            <InView as="div" onChange={handleLoadMore}>
                <h1><CircularProgress /></h1>
            </InView>
            }
        </Container>
    </>
  )
}

export default Profile