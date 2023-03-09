import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Grid, TextField } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import useStyles from './Styles'
import { useMediaQuery } from '@material-ui/core';
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
  width: '45vw',
  height: '75vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const CommentModal = ({show, handleClose, currentId}) => {
  const postData = useSelector((state)=>(currentId ? state.posts.find(((post)=> post.Id === currentId)) : null));
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 960px)');
  const firstName = postData?.UserData.firstName
  const lastName = postData?.UserData.lastName!= undefined ? postData?.UserData.lastName : "";
  const profileName = firstName + " " + lastName ;
  const [commentData, setCommentData] = useState({
    text: "null",
    image: null,
    name: null
  })
  useEffect(()=>{
    if(postData){
      setCommentData({text: postData.PostText,
        image: postData.Image,
        name: postData.UserData.firstName})
    }
  },postData)

  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
        <Box sx={postData?.Image ? style1 : style2}>
          <Grid container
            sx={{
              textAlign: '-webkit-center',
              margin: '10px'
            }}>
                <Grid item xs={postData?.Image ? 12 : 0} md={postData?.Image ? 9 : 0} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={postData?.Image} className={isMobile ? classes.imageCommentXs : classes.imageCommentSm}  />
                </Grid>
                <Grid item xs={12} md={postData?.Image ? 3 : 12}>
                  <Grid item xs={12} style={{display: 'flex'}}>
                    <Grid item xs={3} style={{display: 'flex', justifyContent:'center'}}>
                      <Avatar src={postData?.UserData?.profileImage} alt={postData?.UserData?.firstName} >{postData?.UserData?.firstName?.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item xs={9} style={{display: 'flex',  alignItems: 'center'}}>
                      <Typography style={{textAlign: 'left'}}>
                        {profileName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography style={{marginLeft:'10px'}}>
                        {/* {postData?.PostText} */}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    On Progress...
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