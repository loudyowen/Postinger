import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const EditPostModal = ({show, close, currentId}) => {
  console.log("Modal terpanggil")
  const [editPost, setEditPost] = useState({
    editText: '',
    editImage: ''
  })
  const handleSubmit = () => {

  }
  const handleChange = (e) =>{
    setEditPost({...editPost, [e.target.name]: e.target.value})
  }
  const postsEdit = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
  console.log(postsEdit)
  return (
      <Modal 
      disableAutoFocus
      disablePortal 
      disableScrollLock
      open={show} 
      onClose={close} 
      sx={{overflowY:'auto'}}
      >
        <Box sx={style}>

          <TextField id="outlined-basic" label={postsEdit.PostText} variant="outlined" />
          {/* <h1>{currentId}</h1> */}
        {/* <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container>
                  <div>
                    <FileBase
                          type="file"
                          multiple={false}
                          // onDone={({base64})=> setPostData({...postData, postImage: base64})}
                      />
                  </div>
                  <Button  type='submit' color='primary' variant="contained" fullWidth>Submit</Button>
                </Grid>
            </form> */}
        </Box>
      </Modal>
  );
}

export default EditPostModal