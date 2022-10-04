import { Avatar, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../Input/Input'
import Navbar from '../Navbar/Navbar'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import FileBase from 'react-file-base64';


function AccountSetting() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const userData = JSON.parse(localStorage.getItem('profile'))
    const [user, setUser] = React.useState(userData.userData);
    const [editPicture, setEditPicture] = useState('');
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const handleShowPassword = () => {

    }
    const handleChangePicture = () => {

    }
  return (
    <>
    <Navbar />
        <Container className={classes.container} component="main" maxWidth="md">
            <Paper className={`${classes.paper} ${classes.root}`} elevation={3}>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    {/* AccountSetting image -> Pass user data to AccountSetting */}
                    <Grid container>
                        <IconButton
                            className={classes.profileImage}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({base64})=> setEditPicture({...editPicture, editPicture: base64})}
                              />
                            }
                            color="inherit"
                            >
                            <Avatar sx={{ width: 120, height: 120 }} src={user?.profileImage} alt={user?.firstName}>{user?.firstName?.charAt(0)}</Avatar>
                        </IconButton>
                        <Grid xs={12}>
                            <Typography className={classes.textMenu} variant='h6'>Change Name:</Typography>
                        </Grid>
                            <Input name="lastName" label="Last Name" half handleChange={handleChange} />
                            <Input name="firstName" label="First Name"  half autoFocus handleChange={handleChange}  />
                        <Grid xs={12}>
                            <Typography className={classes.textMenu} variant='h6'>Change Password:</Typography>
                        </Grid>
                        <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} fullWidth handleChange={handleChange} handleShowPassword={handleShowPassword}  />
                        <Input label="Confirm Password" fullWidth />
                    </Grid>
                    <Button  type='submit' color='primary' variant="contained" fullWidth>submit</Button>
                </form>
            </Paper>
        </Container>
    </>
  )
}

export default AccountSetting