import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Grid, TextField } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import useStyles from './Styles'
import CreatePost from '../CreatePost/CreatePost'
import { useMediaQuery } from '@material-ui/core';
import { POSTING_COMMENT } from '../../../constant/actionType';
const style1 = {
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
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,

  '@media (max-width: 600px)': {
    width: '90vw',
  }
};

const CommentModal = ({show, handleClose, currentId}) => {
  const postData = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
  const postId = postData!==null?postData.Id:null
  const comments = useSelector((state)=>state.comments);
  console.log(comments)
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 960px)');
  const firstName = postData?.UserData.firstName
  const lastName = postData?.UserData.lastName!= undefined ? postData?.UserData.lastName : "";
  const profileName = firstName + " " + lastName ;

  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
        {/* check based on  */}
        <Box sx={postData?.Image ? (isMobile ? style2 : style1) : (isMobile ? style2 : style2 ) }>
          <Grid container
             style={{justifyContent: 'center', textAlign: '-webkit-center', height: '100%'}}>
                {/* post image */}
                <Grid item xs={postData?.Image ? 12 : 0} md={postData?.Image ? 9 : 0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', maxHeight: '100%' }}>
                  <img src={postData?.Image} className={isMobile ? classes.imageCommentXs : classes.imageCommentSm}  />
                </Grid>
                {/* comment box */}
                <Grid item xs={12} md={postData?.Image ? 3 : 12} style={{padding: '1vw'}}>
                  {/* avatar */}
                  <Grid item xs={12} style={isMobile ?{display: 'flex', padding: '1vw 0vw 0vw 1vw'}: {display: 'flex', padding: '1vw 0vw 0vw 1vw'}}>
                    <Grid item xs={2} style={{display: 'flex', justifyContent:'center'}}>
                      <Avatar src={postData?.UserData?.profileImage} alt={postData?.UserData?.firstName} >{postData?.UserData?.firstName?.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item xs={10} style={{display: 'flex',  alignItems: 'center'}}>
                      <Typography style={{textAlign: 'left'}}>
                        {profileName}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* post text */}
                  <Grid item xs={12} style={isMobile ?{display: 'flex', padding: '1vw 0vw 0vw 3vw', height: '120px'}: {display: 'flex', padding: '1vw 0vw 0vw 2vw',height: '120px'}}>
                    <Typography style={{textAlign: 'left'}}>
                      {postData?.PostText}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} >
                    <CreatePost textLabel={"Comment..."} type={POSTING_COMMENT} postId={postId} />
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