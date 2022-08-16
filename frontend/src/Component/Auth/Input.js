import React from 'react';
import { TextField, Grid, InputAdornment, IconButton, Icon } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
const Input = ({half,name,handleChange,label,autoFocus,type,handleShowPassword}) => (
    // kalau layar kecil (xs) maka full, jika ada half 
    // dan layar besar maka dibagi 2 (tergantung dari nilai sm nya)
    <Grid item xs={12} sm={half?6:12}>
        <TextField 
            name={name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            label={label}
            autoFocus={autoFocus}
            type={type}
            //&& digunakan untuk if else jika elsenya itu null
            //normalnya seperti ini {name ? data : null}
            // berubah seperti ini {name && data}
            InputProps={ name === "password" && {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password"?<Visibility />:<VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </Grid>
)

export default Input;