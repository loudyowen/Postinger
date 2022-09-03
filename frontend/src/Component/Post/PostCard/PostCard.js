import React,{useState, useEffect} from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, showModal } from '../../../Actions/postAction';
import { Button } from '@mui/material';

const PostCard = ( {post, setCurrentId, setOpenModal}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const profileName = post?.UserData?.firstName + " " + post?.UserData?.lastName;
  console.log("Post data loaded")

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuEdit = () => {
    setOpenModal(true)
    setCurrentId(post.Id)
  }
  const handleMenuDelete = () => {
    dispatch(deletePost(post.Id))
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
    
      <MenuItem onClick={handleMenuEdit}>Edit</MenuItem>
      <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
    </Menu>
  );
  
  return (
    <Card sx={{ width: 550, marginTop: 2}}>
      <CardHeader
        avatar={
          <Avatar src={post?.UserData?.profileImage} alt={post?.UserData?.firstName}>{post?.UserData?.firstName?.charAt(0)}</Avatar>
        }
        // OPTIONAL: MENU ICON
        // 1. EDIT POST
        // 2. DELETE POST
        action={
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

      {!post?.Image.length ? '' : (
        <CardMedia
        component="img"
        height="350"
        image={post?.Image}
        alt="No Image"
        />
        )}
        
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.PostText}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> {post?.Like}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography>
          Comment
        </Typography>
      </CardActions>
    </Card>
  );
}

export default PostCard