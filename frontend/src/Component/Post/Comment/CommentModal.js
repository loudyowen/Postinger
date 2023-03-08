import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import { Grid, TextField } from '@material-ui/core';
import Typography from '@mui/material/Typography';
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

const CommentModal = ({show, handleClose}) => {
  const classes = useStyles();
  return (
      <Modal disableAutoFocus disablePortal disableScrollLock open={show} onClose={handleClose} sx={{overflowY:'auto'}} >
        <Box sx={style}>
          <Grid container
            sx={{
              textAlign: '-webkit-center',
              margin: '10px'
            }}>
  
                {/* how if there is no image? */}
                {/* image ? */}
                <Grid item xs={9}>
                  Image
                </Grid>
                {/* : */}
                <Grid item xs={3}>
                  <Grid item xs={12}>
                    user profile
                  </Grid>
                  <Grid item xs={12}>
                    comment box
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