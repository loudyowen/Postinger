import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { Grid, TextField } from '@material-ui/core';
// import FileBase from 'react-file-base64';
// import { useDispatch, useSelector } from "react-redux";
// import { updatePost } from '../../../Actions/postAction';
import useStyles from './Styles'
// import Dropzone from 'react-dropzone';
// import AvatarEditor from 'react-avatar-editor';
// import Resizer from "react-image-file-resizer";
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

// const resizeFile = (file) =>
//   new Promise((resolve) => {
//       Resizer.imageFileResizer(
//       file, // file image
//       1920, //maxWidth
//       1080, // maxHeigh
//       "JPEG", // compressFormat
//       80, // quality
//       0, // rotation
//       (uri) => {
//           resolve(uri);
//       },
//       "base64"
//   );
// });

const CommentModal = ({show, handleClose}) => {
//   const postEdit = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
// //   const postId = postEdit!==null?postEdit.Id:null
//   const dispatch =  useDispatch();
    const classes = useStyles();
//   const [editPost, setEditPost] = useState({
//     text: null,
//     postImage: null
//   })

//   useEffect(()=>{
    // if(postEdit){
    //   setEditPost({...editPost, text: postEdit.PostText})
    //   setEditPost({...editPost, postImage: postEdit.Image})
    // }
//   },postEdit)
//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     dispatch(updatePost(postId,editPost))
//     handleClose()
//   }
//   const handleChange = (e) =>{
//     setEditPost({...editPost, [e.target.name]: e.target.value})
//   }


//   const handleDrop = async (dropped) => {
//     try{
//       const file = dropped[0]
//       const image = await resizeFile(file)
//       setEditPost({ ...editPost,postImage: image })
//     } catch (err) {
//       console.log(err);
//     }
//   }

  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
        <Box sx={style}>
            <Typography className={classes.info}>
                On Progress ...
            </Typography>
        </Box>
      </Modal>
  );
}

export default CommentModal