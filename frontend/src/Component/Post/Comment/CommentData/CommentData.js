import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { Button } from '@mui/material';

const CommentData = ( {comment}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const firstName = comment?.UserData.firstName
  const lastName = comment?.UserData.lastName!= undefined ? comment?.UserData.lastName : "";
  const profileName = firstName + " " + lastName ;
  const user = JSON.parse(localStorage.getItem('profile'))
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuEdit = () => {
    // setCurrentId(post.Id)
    // setOpenModalEditPost(true)
    handleMenuClose()
  }
  const handleCommentModal = () => {
    // setCurrentId(post.Id)
    // setOpenModalComment(true)
    handleMenuClose()
  }
  const handleMenuDelete = () => {
    // dispatch(deletePost(post.Id))
    // setSkipId({skip: posts.length-1})
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      
    >
      <MenuItem onClick={handleMenuEdit} >Edit</MenuItem>
      <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
    </Menu>
  );

  
  return (
    <Card sx={{ width: '90%',  height: '10%', marginTop: 2, overflowY:'auto', boxShadow: 4} }>
      <CardHeader
        avatar={
          <Avatar src={comment?.UserData?.profileImage} alt={comment?.UserData?.firstName}>{comment?.UserData?.firstName?.charAt(0)}</Avatar>
        }
        action={
            user.id === comment?.UserData.id && 
            <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={profileName}
        />
         {renderMenu}

      {/* {!comment?.Image.length ? '' : (
        <CardMedia
        component="img"
        height="auto"
        image={comment?.Image}
        alt="No Image"
        />
        )} */}
        
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment?.PostText}
          {console.log(comment?.PostText)}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> {comment?.Like}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button variant='text' sx={{color: 'white'}} onClick={handleCommentModal}>
        
        </Button>
      </CardActions>
    </Card>
  );
}

export default CommentData