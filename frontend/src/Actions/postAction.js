import { display } from '@mui/system';
import * as api from '../api';
import {CREATE, DELETE, FETCH_ALL, FETCH_MORE, EDIT_MODAL, UPDATE} from '../constant/actionType'

export const getPosts = () => async (dispatch) =>{
    try {
        const { data } = await api.getPosts();
        dispatch({type: FETCH_ALL, payload: data})
        // console.table(data)
    } catch (error) {
        console.log(error)
        // console.log(error.response.data)
    }
}

export const getMorePost = (skip) => async (dispatch) => {
    try{
        const { data } = await api.getMorePosts(skip);
        console.log(data)
        dispatch({type: FETCH_MORE, payload: data})
        
    }catch(error){
        console.log(error)
    }
}

export const postStatus = (postData) => async (dispatch) =>{
    console.log(postData)
    try{
        const { data } = await api.postStatus(postData)
        const payload = data.data.data;
       
        dispatch({type: CREATE, payload: payload})
    }catch(error){
        console.log(error)
    }
}

export const deletePost = (postId) => async (dispatch) =>{
    try{
        await api.deletePost(postId)
        dispatch({type: DELETE, payload: postId})
    console.log("DELETE POST CALLED!!!")

    }catch(error){
        console.log(error)
    }
}

export const updatePost = (id,postData) => async (dispatch) => {
    try{
        const { data }  = await api.updatePost(id,postData)
        const  payload  = data.data.data
        dispatch({type: UPDATE, payload: payload})
    }catch(error){
        console.log(error)
    }
}