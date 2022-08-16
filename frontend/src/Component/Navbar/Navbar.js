import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {AppBar, Typography, Avatar, Toolbar, Button} from '@material-ui/core'

import blogIcon from '../../images/memories.png'

import useStlyes from './styles'
import { useDispatch } from 'react-redux'

function Navbar() {
    const styles = useStlyes();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(userData);

    // change login/logout button when location changes (from /auth to /)
    useEffect(()=>{
        const sub = user?.sub;
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

 

    const logout = () =>{
        dispatch({type: 'LOGOUT'})
        setUser(null)
        navigate('/')
    }

    return (
    <AppBar className={styles.appBar} position="static" color="inherit">
        <div className={styles.brandContainer}>
            <img className={styles.image} src={blogIcon} alt="blog_icon" height={60} />
            <Typography className={styles.heading} component={Link} to="/"  variant="h2" align="center">
                Blog Post
            </Typography>
        </div>
        <Toolbar className={styles.toolbar}>
            {/* so in here we make if logic, if the user has login (that mean the user data is present) 
            then we want to show the user profile / avatar 
            if user is not present the just simply show the sign in button*/}
            {user ? (
                <div className={styles.profile}>
                    <Avatar className={styles.purple} src={user?.picture} alt={user?.name}>{user.userData ? user?.userData?.name.charAt(0) : user?.name.charAt(0) }</Avatar>
                    <Typography className={styles.userName} variant="h6">{user.userData ? user?.userData?.name : user?.name }</Typography>
                    <Button variant='contained' className={styles.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant='contained' color="primary" >Login</Button>
            )}
        </Toolbar>
    </AppBar>
    )
}

export default Navbar