import { Avatar, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Input from '../Input/Input'
import Navbar from '../Navbar/Navbar'
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import FileBase from 'react-file-base64';
import Dropzone from 'react-dropzone';
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
      Resizer.imageFileResizer(
      file, // file image
      1920, //maxWidth
      1080, // maxHeigh
      "JPEG", // compressFormat
      80, // quality
      0, // rotation
      (uri) => {
          resolve(uri);
      },
      "base64"
  );
});
  

function AccountSetting() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const userData = JSON.parse(localStorage.getItem('profile'))
    const [user, setUser] = React.useState(userData.userData);
    const [editProfile, setEditProfile] = useState({
        profileImage: user?.profileImage,
        firstName: user?.firstName,
        lastNamme: user?.lastName,
        password: ""
    });
    const handleDrop = async (dropped) => {
        try{
          const file = dropped[0]
          const image = await resizeFile(file)
          setEditProfile({ ...editProfile,profileImage: image })
        } catch (err) {
          console.log(err);
        }
      }
    // console.log(editPicture.image)
    console.log(user)
    const handleChange = (e) => {
        setEditProfile({...editProfile,[e.target.name]: e.target.value})
    }
    const handleSubmit = () => {

    }
    const handleShowPassword = () => {

    }
    const handleChangePicture = () => {

    }
    console.log(editProfile.firstName)
    console.log(editProfile.lastNamme)

  return (
    <>
    <Navbar />
        <Container className={classes.container} component="main" maxWidth="md">
            <Paper className={`${classes.paper} ${classes.root}`} elevation={3}>
                <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container>
                        <IconButton
                        className={classes.profileImage}
                        size="large"
                        edge="end"
                        aria-haspopup="true"
                        color="inherit"
                        > 
                            <Dropzone
                            onDrop={handleDrop}
                            noKeyboard
                            style={{ width: '250px', height: '250px' }}
                            >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <Avatar sx={{ width: 120, height: 120 }} src={editProfile.profileImage} alt={user?.firstName}>{user?.firstName?.charAt(0)}</Avatar>
                                <input {...getInputProps()} />
                            </div>
                            )}
                          </Dropzone>
                        </IconButton>
                        <Grid xs={12}>
                            <Typography className={classes.textMenu} variant='h6'>Change Name:</Typography>
                        </Grid>
                            <Input name="lastName" label="Last Name" half handleChange={handleChange}  />
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