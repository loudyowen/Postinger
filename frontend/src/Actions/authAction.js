import { display } from '@mui/system';
import * as api from '../api';
import {AUTH, CREATE} from '../constant/actionType'

export const signUp = (form, navigate) => async (dispatch) =>{
    try{
        const { data } = await api.signUpApi(form)
        dispatch({type: AUTH, data: data.data})
        navigate('/home')
        navigate(0)
    }catch(error){
        console.log(error)
    }
}

export const signIn = (form, navigate) => async (dispatch) => {
    try{
        const {data} = await api.signInApi(form)
        // console.log(data)
        // console.log(data.data)
        dispatch({type: AUTH, data: data.data })
        // console.log(data)
        // console.log(data.data.token)
        // console.log(data.data.userData)
        // return(data.data.token)
        // navigate('/home')
        // navigate(0)

    }catch(err){
        console.log(err)
    }
}

