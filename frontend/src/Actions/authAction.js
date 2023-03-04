import { display } from '@mui/system';
import * as api from '../api';
import {AUTH} from '../constant/actionType'

export const signUp = (form, navigate) => async (dispatch) =>{
    try{
        const { data } = await api.signUpApi(form)
        navigate(0)
        navigate('/')
    }catch(err){
        console.log(err)
    }
}

export const signIn = (form, navigate) => async (dispatch) => {
    try{
        const {data} = await api.signInApi(form)
        dispatch({type: AUTH, data: data.data })
        navigate(0)
        navigate('/home')

    }catch(err){
        console.log(err)
    }
}

