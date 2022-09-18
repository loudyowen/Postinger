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
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    {/* profile image -> Pass user data to profile */}
                    <Grid container>
                        <Typography variant='h5'>Change Name:</Typography>
                        <Grid xs={12} md={6}>
                        <Input name="lastName" label="Last Name" half handleChange={handleChange} />
                        </Grid>
                        <Grid xs={12} md={6}>
                        <Input name="firstName" label="First Name"  half autoFocus handleChange={handleChange}  />
                        </Grid>
                        <Typography variant='h5'>Change Password:</Typography>
                        <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} fullWidth handleChange={handleChange} handleShowPassword={handleShowPassword}  />
                    </Grid>
                    <Button  type='submit' color='primary' variant="contained" fullWidth>submit</Button>
                </form>
            </Paper>
        </Container>
    </>
  )
}

export default Profile