import React from 'react';
import { TextField, Grid, InputAdornment, IconButton, Icon } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import useStyles from './styles'


const Input = ({half,name,handleChange,label,autoFocus,type,handleShowPassword}) => (

        <Grid item xs={12} sm={half?6:12}>
            <TextField 
                color="white"
                name={name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                label={label}
                autoFocus={autoFocus}
                type={type}
                
                InputProps={ name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password"?<Visibility />:<VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    style:{
                        color: 'white',
                        
                    },
                    InputLabelProps: {
                        color: 'white'
                    }
                }:{
                    style:{
                        color: 'white',
                    },
                    InputLabelProps: {
                        color: 'white'
                    }
                }
            }
            />
        </Grid>

)

export default Input;