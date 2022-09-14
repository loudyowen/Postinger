import { display } from '@mui/system';
import * as api from '../api';
import {AUTH, CREATE} from '../constant/actionType'

export const signUp = (form, navigate) => async (dispatch) =>{
    try{
        const { data } = await api.signUpApi(form)
        console.log(data)
        const profile = {
            id: data.data.data.id,
            email: data.data.data.email,
            firstName: data.data.data.firstName,
            lastName: data.data.data.lastName,
            profileImage: data.data.data.profileImage
        }
        dispatch({type: AUTH, data: profile})
        navigate('/home')
    }catch(error){
        console.log(error)
    }
}

export const signIn = (form, navigate) => async (dispatch) => {
    try{
        const {data} = await api.signInApi(form)
        const profile = {
            id: data.data.data.id,
            email: data.data.data.email,
            firstName: data.data.data.firstName,
            lastName: data.data.data.lastName,
            profileImage: data.data.data.profileImage
        }
        dispatch({type: AUTH, data: profile })
        navigate('/home')
    }catch(err){
        console.log(err)
    }
}

