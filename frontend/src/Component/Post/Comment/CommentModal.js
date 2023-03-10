import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Grid, TextField } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import useStyles from './Styles'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '75vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const CommentModal = ({show, handleClose, currentId}) => {
  const postComment = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
  const classes = useStyles();
  const [commentData, setCommentData] = useState({
    text: "null",
    image: null,
  })
  useEffect(()=>{
    if(postComment){
      // console.log("post called")
      // setCommentData({...commentData, name: postComment.UserData.firstName})
      setCommentData({text: postComment.PostText,
        image: postComment.Image,
        })
      // setCommentData({...commentData, image: postComment.Image})
    }
  },postComment)
  console.log(postComment)
  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
        <Box sx={style}>
          <Grid container>
  
                {/* how if there is no image? */}
                {/* image ? */}
                <Grid item xs={9} style={{ display: 'flex', justifyContent: 'center' }} >
                  <img src={postComment?.Image} style={{ maxHeight: '75vh', maxWidth: '100%' }} />
                </Grid>
                {/* : */}
                <Grid item xs={3}>
                  <Grid item xs={12}>
                    <Grid item xs={3}>
                      <Avatar src={postComment?.UserData?.profileImage}alt={postComment?.UserData?.firstName}>{postComment?.UserData?.firstName?.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      {postComment?.UserData?.firstName}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    create comment box
                  </Grid>
                  <Grid item xs={12}>
                    comment
                  </Grid>
                </Grid>
                {/*Grid Left PostImage 
                  Grid right:
                  - User image,name, user post text
                  - comment
                */}
          </Grid>
        </Box>
      </Modal>
  );
}

export default CommentModal