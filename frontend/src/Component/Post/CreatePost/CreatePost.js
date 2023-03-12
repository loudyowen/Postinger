import { Box, Grid } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react'
import useStyles from './Styles'
import FileBase from 'react-file-base64';
import {useNavigate}from 'react-router-dom'
import { postStatus, postComment } from '../../../Actions/postAction';
import {useDispatch} from 'react-redux'
import Compressor from 'compressorjs';
import Resizer from "react-image-file-resizer";
import { POSTING_COMMENT, POSTING_STATUS } from '../../../constant/actionType';

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

const CreatePost = ( {style,textLabel,type, postId}) => {
  // console.log(createPostStyle)
  const label = textLabel
  const createPostStyle = style
  const pId = postId
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const uId = user.id
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
    if(type==POSTING_STATUS){
      dispatch(postStatus({...postData,uId}))
    }
    if(type==POSTING_COMMENT){
      dispatch(postComment({...postData,uId,pId}))
    }
    clear()
  }
const handleUploadImage = async(e) =>{
  try{
    const base64 = e.target.files
    const file = base64
    const image = await resizeFile(file[0])
    setPostData({ ...postData,postImage: image })
  } catch (err) {
    console.log(err);
  }
}
 
 return (
    <Grid container className={classes.PostContainer} >
         <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container style={createPostStyle}>
                    <Grid item xs={12}>
                      <TextField name="postText" label={label} variant='filled' multiline rows={4} fullWidth onChange={handleChange}  />
                    </Grid>
                    <Grid item xs={4}>
                      <div >
                        <input
                            type="file"
                            multiple={false}
                            accept="image/*"
                            onChange={handleUploadImage}
                          />
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