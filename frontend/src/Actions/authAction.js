import { display } from '@mui/system';
import * as api from '../api';
import {AUTH, CREATE} from '../constant/actionType'

export const signUp = (form, navigate) => async (dispatch) =>{
    console.log(form)
    try{
        const { data } = await api.signUpApi(form)
        dispatch({type: AUTH, payload: data})
        navigate('/home')
    }catch(error){
        console.log(error)
    }
}

export const signIn = (form, navigate) => async (dispatch) => {
    try{
        const {data} = await api.signInApi(form)
        dispatch({type: AUTH, payload: data })
        navigate('/home')
    }catch(err){
        console.log(err)
    }
}