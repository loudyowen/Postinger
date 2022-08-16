import { display } from '@mui/system';
import * as api from '../api';
import {AUTH, CREATE} from '../constant/actionType'

export const signUp = (form) => async (dispatch) =>{
    console.log(form)
    try{
        const { data } = await api.signUpApi(form)
        dispatch({type: AUTH, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const signIn = (form) => async (dispatch) => {
    try{
        const {data} = await api.signInApi(form)
        dispatch({type: AUTH, payload: data })
    }catch(err){
        console.log(err)
    }
}