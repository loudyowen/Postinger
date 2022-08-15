import React, {useState} from "react";
import {TextField, Paper, Button} from '@mui/material';
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import { createForm } from "../actions/formAction";
const Form = () =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createForm({...formData}))
    }
    return(
        <Paper className={`${classes.paper} ${classes.root}`} elevation={6}>
             <h1>
                Sign Up
            </h1>
            <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField name='firstName' id="outlined-basic" label="First Name" variant="outlined" fullWidth value={formData.firstName} onChange={(e)=>setFormData({...formData, firstName: e.target.value})}/>
                <TextField name='lastName' id="outlined-textarea" multiline label="Last Name" variant="outlined" fullWidth value={formData.lastName} onChange={(e)=>setFormData({...formData, lastName: e.target.value})}/>
                <TextField name='email' id="outlined-textarea" multiline label="Email" variant="outlined" fullWidth value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
                <TextField name='password' id="outlined-textarea" multiline label="Password" variant="outlined" fullWidth value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
                <TextField name='confirmPassword' id="outlined-textarea" multiline label="Confirm Password" variant="outlined" fullWidth value={formData.confirmPassword} onChange={(e)=>setFormData({...formData, confirmPassword: e.target.value})}/>
            

                <Button variant="contained" color="primary" size="large" type="submit">Submit</Button>
            </form>
        </Paper>

    )
}

export default Form