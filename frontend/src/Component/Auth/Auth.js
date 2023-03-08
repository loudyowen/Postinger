import React, {useState} from "react";
import {Container, Grid, Typography, Paper, Button, FormHelperText} from '@mui/material';
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import {useNavigate}from 'react-router-dom'
import Input from "../Input/Input"
import FileBase from 'react-file-base64';
import {signUp, signIn} from "../../Actions/authAction"
const Auth = () =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }

    const switchSignMode = () => {
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.email==''){
            setError("Error: Email must not be empty")
            return
        }
        if(formData.password==''){
            setError("Error: Password must not be empty")
            return
        }
        if(isSignUp){
            if(formData.firstName==''){
                setError("Error: First name must not be empty")
                return
            }
            if(formData.password != formData.confirmPassword){
                setError("Error: Confirm password is not match")
                return
            }
        }
        if(isSignUp){
            dispatch(signUp({...formData},navigate))
        }else{
            dispatch(signIn({...formData},navigate))
        }
    }
    const handleDemoLogin = (e) => {
        setFormData(formData.email='demo@mail.com')
        setFormData(formData.password='admin123')
        dispatch(signIn({...formData},navigate))
    }
    return(
    <Container className={classes.container} component="main" maxWidth="md">
        <Paper className={`${classes.paper} ${classes.root}`} elevation={3}>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
            <FormHelperText focused sx={{fontSize: 18,textAlign: "center",color: 'red'}}>{error}</FormHelperText>

            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignUp && (
                        <>
                            <Input name="firstName" label="First Name"  half autoFocus handleChange={handleChange} required  />
                            <Input name="lastName" label="Last Name" half handleChange={handleChange} />
                        </>
                    )}

                    <Input name="email" label="Email" type="email" fullWidth handleChange={handleChange} value={formData.email} required />
                    <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} fullWidth handleChange={handleChange} handleShowPassword={handleShowPassword} value={formData.password} required />
                    
                    {isSignUp && (
                        <>
                            <Input name="confirmPassword" label="Confirm Password" type={showPassword ? 'text' : 'password'} fullWidth handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        <Grid item xs={4}>
                            <div className={classes.filebase}>
                            <Typography sx={{textAlign: 'left'}}>Profile Image:</Typography>
                            <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({base64})=> setFormData({...formData, profileImage: base64})}
                                    name="profileImage"
                                />
                            </div>
                        </Grid>
                        </>

                    )}
                </Grid>
                <Button  type='submit' color='primary' variant="contained" fullWidth>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                <Button onClick={switchSignMode}>
                        {isSignUp?"Already have account? Click here to login" : "Don't have account? click here to sign up"}
                </Button>   
                {!isSignUp &&
                    <>
                        <p>OR</p>
                        <Button  type='submit' color='primary' variant="contained" onClick={handleDemoLogin} fullWidth> Demo Login</Button>
                    </>
                }
            </form>
        </Paper>
    </Container>
    )
}

export default Auth