import { display } from '@mui/system';
import * as api from '../api';
import {CREATE, DELETE, FETCH_ALL, EDIT_MODAL, UPDATE} from '../constant/actionType'

export const getPosts = () => async (dispatch) =>{
    try {
        const { data } = await api.getPosts();
        console.log("GET POST CALLED!!!")
        console.log(data)
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const postStatus = (postData) => async (dispatch) =>{
    console.log(postData)
    try{
        const { data } = await api.postStatus(postData)
        const payload = data.data.data;
        console.log("CREATE POST CALLED!!!")
       
        dispatch({type: CREATE, payload: payload})
    }catch(error){
        console.log(error)
    }
}

export const deletePost = (postId) => async (dispatch) =>{
    try{
        await api.deletePost(postId)
        console.log(postId)
        dispatch({type: DELETE, payload: postId})
    console.log("DELETE POST CALLED!!!")

    }catch(error){
        console.log(error)
    }
}

export const updatePost = (id,postData) => async (dispatch) => {
    console.log(postData)
    try{
        const { data }  = await api.updatePost(id,postData)
        const  payload  = data.data.data
        // console.log("update payload: ",payload)
        console.log(payload)
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
    // dispatch({type: EDIT_MODAL, payload: postData})
}