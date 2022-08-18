import { Box, Grid } from '@material-ui/core'
import { Button, TextField, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react'
import useStyles from './Styles'
import FileBase from 'react-file-base64';



function CreatePost() {
  const classes = useStyles();
  const [postData, setPostData] = useState({

  })
  const handleChange = (e) =>{
    setPostData({...postData, [e.target.name]: e.target.value})
    // setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
  }
 return (
    <Grid container className={classes.PostContainer} >
         <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                    <TextField name="postText" label="What's on your mind?" type="textbox" variant='filled' multiline rows={4} fullWidth handleChange={handleChange}  />
                    </Grid>
                    <Grid xs={4}>
                      <div >
                        <FileBase
                              type="file"
                              multiple={false}
                              onDone={({base64})=> setPostData({...postData, selectedFile: base64})}
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