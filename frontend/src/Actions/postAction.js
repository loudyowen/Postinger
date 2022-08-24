import { display } from '@mui/system';
import * as api from '../api';
import {CREATE, FETCH_ALL} from '../constant/actionType'

export const getPosts = () => async (dispatch) =>{
    try {
        const { data } = await api.getPosts();
        console.log(data)
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
        // console.log("GET POST ERROR")
    }
}

export const postStatus = (postData) => async (dispatch) =>{
    try{
        const { data } = await api.postStatus(postData)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}


