import React,{useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@material-ui/core';

// Tobe Cont.
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));



export default function PostCard(post) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const profileName = post?.post?.UserData?.firstName + " " + post?.post?.UserData?.lastName
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(post)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuEdit = () => {
    
  }
  const handleMenuDelete = () => {

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
          // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //   {/* 1. AVATAR */}
          //   R 
          // </Avatar>
          <Avatar src={post?.post?.UserData?.profileImage} alt={post?.post?.UserData?.firstName}>{post?.post?.UserData?.firstName?.charAt(0)}</Avatar>
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
        // subheader="September 14, 2016"
      />
      {renderMenu}

      {/* 2. IMAGE FILE */}
      <CardMedia
        component="img"
        height="350"
        image={post?.post?.Image}
        alt="No Image"
      />

      {/* 3. POST TEXT */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.post?.PostText}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> {post?.post?.Like}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* SEE MORE FEATURE */}
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
        </CardContent />
      </Collapse> */}
    </Card>
  );
}
