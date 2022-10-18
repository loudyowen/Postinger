import { Box, Grid } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react'
import useStyles from './Styles'
import FileBase from 'react-file-base64';
import {useNavigate}from 'react-router-dom'
import { postStatus } from '../../../Actions/postAction';
import {useDispatch} from 'react-redux'
import Compressor from 'compressorjs';
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

const CreatePost = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const uId = user.userData.id
  const [postData, setPostData] = useState({
    postText: '',
    postImage: ''
  })
  const handleChange = (e) =>{
    setPostData({...postData, [e.target.name]: e.target.value})
  }
  const clear = () => {
    setPostData({
      postText: '',
      postImage: ''
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(postStatus({...postData,uId}))
    clear()
  }
  // console.log(setPostData.postImage)
const handleUploadImage = async(e) =>{
  try{
    const base64 = e.target.files
    // console.log(base64)
    // console.log(base64[0])
    const file = base64
    const image = await resizeFile(file[0])
    console.log(image)
    setPostData({ ...postData,postImage: image })
  } catch (err) {
    console.log(err);
  }
}
 

  // const handleCompressedUpload = (e) => {
  //   const image = e.target.files[0];
  //   console.log(image)
  //   new Compressor(image, {
  //     quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
  //     success: (compressedResult) => {
  //       // compressedResult has the compressed file.
  //       // Use the compressed file to upload the images to your server.        
  //       setPostData({...postData, postImage: compressedResult})
  //     },
  //   });
  // };
  // console.log({...postData})
 return (
    <Grid container className={classes.PostContainer} >
         <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                    <TextField name="postText" label="What's on your mind?" variant='filled' multiline rows={4} fullWidth onChange={handleChange}  />
                    </Grid>
                    <Grid item xs={4}>
                      <div >
                        <input
                            type="file"
                            multiple={false}
                            accept="image/*"
                            // onDone={({base64})=> setPostData({...postData, postImage: base64})}
                            onChange={handleUploadImage}
                          />
                          {/* <input
                            accept="image/*,capture=camera"
                            capture="”camera"
                            type="file"
                            onChange={(event) => handleCompressedUpload(event)}
                          /> */}
                      </div>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                      <Button  type='submit' color='primary' variant="contained" fullWidth>Submit</Button>
                    </Grid>
                   
                </Grid>
            </form>
    </Grid>
  )
}

export default CreatePost