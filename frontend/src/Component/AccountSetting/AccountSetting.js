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
import { editAccount } from '../../Actions/accountAction'


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
    const [user, setUser] = React.useState(userData);
    const [editProfile, setEditProfile] = useState({
        id: user?.id,
        profileImage: user?.profileImage,
        email : user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
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
    // console.log(editProfile.profileImage)
    console.log(user)
    const handleChange = (e) => {
        setEditProfile({...editProfile,[e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editAccount({...editProfile}))
        navigate("/")
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
                        <Grid item xs={12}>
                            <Typography className={classes.textMenu} variant='h6'>Change Name:</Typography>
                        </Grid>
                            <Input name="firstName" label="First Name"  half autoFocus handleChange={handleChange}  />
                            <Input name="lastName" label="Last Name" half handleChange={handleChange}  />
                     
                        <Button variant="contained">Change Password</Button>
                    </Grid>
                    <Button  type='submit' color='primary' variant="contained" fullWidth>submit</Button>
                </form>
            </Paper>
        </Container>
    </>
  )
}

export default AccountSetting