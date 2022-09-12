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
  const postEditImage = postEdit!==null?postEdit.Image:null
  const [editPost, setEditPost] = useState({
    postText: postEdit!==null?postEdit.PostText:"",
    postImage: postEditImage
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    if({...editPost.postImage===""}){
      setEditPost({postImage: postEdit.Image})
    }
    dispatch(updatePost(postId,editPost))
    handleClose()
  }
  const handleChange = (e) =>{
    setEditPost({...editPost, [e.target.name]: e.target.value})
  }
  // console.log({...editPost})


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
            <Grid xs={12} >
              <Typography variant="h4" sx={{textAlign: 'center'}}>Edit Post</Typography>
            </Grid>
            <Grid xs={12} sx={{width: '80%'}} >
              <Typography variant="h6">Edit Text :</Typography>
              <TextField name="postText" variant="filled" multiline fullWidth rows={6} onChange={handleChange}
                InputProps={{
                    className: classes.input,
                }}
                defaultValue={postEdit!==null?postEdit.PostText:null}  
              />  
            </Grid>
            <Grid xs={12}>
              <Typography variant="h6">Edit Image :</Typography>
              <img src={postEdit!==null?postEdit.Image:null} style={{width:'auto',height:'30vh'}}/>
            </Grid>
            <Grid xs={12}>
              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({base64})=> setEditPost({...editPost, postImage: base64})}
                />
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