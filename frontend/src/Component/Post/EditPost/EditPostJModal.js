import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from '../../../Actions/postAction';
import useStyles from './Styles'
import Dropzone from 'react-dropzone';
import Resizer from "react-image-file-resizer";
import { Scrollbars } from 'react-custom-scrollbars';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '75vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px'
};

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

const EditPostModal = ({show, handleClose, currentId}) => {
  const postEdit = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
  const postId = postEdit!==null?postEdit.Id:null
  const dispatch =  useDispatch();
  const classes = useStyles();
  const [editPost, setEditPost] = useState({
    text: null,
    postImage: null
  })

  // do useEffect so it will show the image when we load the modal 
  useEffect(()=>{
    if(postEdit){
      setEditPost({text: postEdit.PostText, postImage: postEdit.Image})
    }
  },postEdit)
  console.log(editPost.text)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(postId,editPost))
    handleClose()
  }
  const handleChange = (e) =>{
    setEditPost({...editPost, [e.target.name]: e.target.value})
  }

  const handleDrop = async (dropped) => {
    try{
      const file = dropped[0]
      const image = await resizeFile(file)
      setEditPost({ ...editPost,postImage: image })
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
          <Box sx={style}>
         <Scrollbars style={{ width: '50vw', height: '75vh' }}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container
            sx={{
              textAlign: '-webkit-center',
              margin: '10px'
            }}
            >
              <Grid item xs={12} >
                <Typography variant="h4" sx={{textAlign: 'center'}}>Edit Post</Typography>
              </Grid>
              <Grid item xs={12} sx={{width: '80%'}} >
                <Typography variant="h6">Edit Text :</Typography>
                <TextField name="postText" variant="filled" multiline fullWidth minRows={6} onChange={handleChange}
                  InputProps={{
                      className: classes.input,
                  }}
                  value={editPost.text}  
                />  
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Edit Image :</Typography>
              </Grid>
              <Grid item xs={12} className={classes.dropZone}>
                <div style={{ width: '100%', height: '100%', maxHeight: '80%', maxWidth: '80%', userSelect: 'none' }}>
                  <Dropzone onDrop={handleDrop} noKeyboard style={{ width: '250px', height: '250px', position: 'relative' }}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <div style={{ position: 'relative' }}>
                          <img src={editPost.postImage} style={{ display: 'flex', maxHeight: '100%', maxWidth: '100%' }} />
                            <div className={classes.dropZoneOverlay}>
                              Click or Drop image here
                            </div>
                        </div>
                        <input {...getInputProps()} />
                      </div>
                    )}
                  </Dropzone>
                </div>
              </Grid>
              <Button className={classes.submit}  type='submit' color='primary' variant="contained" fullWidth>Submit</Button>
            </Grid>
          </form>
        </Scrollbars>

          </Box>
      </Modal>
  );
}

export default EditPostModal