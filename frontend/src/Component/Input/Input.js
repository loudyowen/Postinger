import React from 'react';
import { TextField, Grid, InputAdornment, IconButton, Icon } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'


const Input = ({half,name,handleChange,label,autoFocus,type,value,handleShowPassword}) => (

        <Grid item={true} xs={12} sm={half?6:12}>
            <TextField 
                color="primary"
                name={name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                value={value}
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
                    inputlabelprops: {
                        color: 'white'
                    }
                }:{
                    inputProps:{ style: {  color: 'white', borderColor: 'white'}}
                }
            }
            />
        </Grid>

)

export default Input;