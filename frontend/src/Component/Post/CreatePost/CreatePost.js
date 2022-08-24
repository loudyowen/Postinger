import { Box, Grid } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react'
import useStyles from './Styles'
import FileBase from 'react-file-base64';
import {useNavigate}from 'react-router-dom'
import { postStatus } from '../../../Actions/postAction';
import {useDispatch} from 'react-redux'



function CreatePost() {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('profile'))
  // console.log(userData)
  const uId = userData.id
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
 return (
    <Grid container className={classes.PostContainer} >
         <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                    <TextField name="postText" label="What's on your mind?" variant='filled' multiline rows={4} fullWidth onChange={handleChange}  />
                    </Grid>
                    <Grid xs={4}>
                      <div >
                        <FileBase
                              type="file"
                              multiple={false}
                              onDone={({base64})=> setPostData({...postData, postImage: base64})}
                          />
                      </div>
                    </Grid>
                    <Grid xs={4}>

                    </Grid>
                    <Grid xs={4}>
                      <Button  type='submit' color='primary' variant="contained" fullWidth>Submit</Button>
                    </Grid>
                   
                </Grid>
                
          
            </form>
    </Grid>
  )
}

export default CreatePost