import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from '../../../Actions/postAction';
import useStyles from './Styles'
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  height: '75vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const EditPostModal = ({show, handleClose, currentId}) => {
  const postEdit = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
  const postId = postEdit!==null?postEdit.Id:null
  const dispatch =  useDispatch();
  const classes = useStyles();
  const [editPost, setEditPost] = useState({
    postText: "",
    postImage: null
  })
  useEffect(()=>{
    if(postEdit){
      setEditPost({...editPost, postText: postEdit.PostText})
      setEditPost({...editPost, postImage: postEdit.Image})
    }
  },postEdit)
  // useEffect(()=>{
    
  // })

  console.log(postEdit!==null?postEdit.PostText:null)
  // console.log(editPost.postImage)
  console.log(editPost.postText)
  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(updatePost(postId,editPost))
    handleClose()
  }
  const handleChange = (e) =>{
    setEditPost({...editPost, [e.target.name]: e.target.value})
  }

  const getBase64 = (file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
      //   console.log(reader.result);
      setEditPost({ ...editPost,postImage: reader.result })
      };
      reader.onerror = function (error) {
      console.log('Error: ', error);
      };
  }

  const handleDrop = (dropped) => {
      // console.log(dropped)
      getBase64(dropped[0])
  }


  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
        <Box sx={style}>
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
                defaultValue={editPost.PostText}  
              />  
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Edit Image :</Typography>
              {/* <img src={postEdit!==null?postEdit.Image:null} style={{width:'auto',height:'30vh'}}/> */}
            </Grid>
            <Grid item xs={12}>
              <div>
                {/* <FileBase
                  type="file"
                  multiple={false}
                  onDone={({base64})=> setEditPost({...editPost, postImage: base64})}
                /> */}
                <Dropzone
                  onDrop={handleDrop}
                  noClick
                  noKeyboard
                  style={{ width: '250px', height: '250px' }}
                  >
                  {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                      <img width={250} height={250} src={editPost.postImage} />
                      <input {...getInputProps()} />
                  </div>
                  )}
              </Dropzone>
              </div>
            </Grid>
            <Button  type='submit' color='primary' variant="contained" fullWidth>Submit</Button>
          </Grid>
        </form>
        </Box>
      </Modal>
  );
}

export default EditPostModal