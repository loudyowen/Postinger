import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
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
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const handleShowPassword = () => {

    }
  return (
    <>
    <Navbar />
        <Container className={classes.container} component="main" maxWidth="md">
            <Paper className={`${classes.paper} ${classes.root}`} elevation={3}>
                Profile
            </Paper>
        </Container>
    </>
  )
}

export default Profile