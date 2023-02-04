import { Avatar, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../Input/Input'
import Navbar from '../Navbar/Navbar'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {useNavigate}from 'react-router-dom'


function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('profile'))
    const [user, setUser] = React.useState(userData);
    const [profile, setProfile] = useState({
      id: user?.id,
      profileImage: user?.profileImage,
      firstName: user?.firstName,
      lastName: user?.lastName,
    })
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const handleShowPassword = () => {

    }
    console.log(user)
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
        </Container>
    </>
  )
}

export default Profile