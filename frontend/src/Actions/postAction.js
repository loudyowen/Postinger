import { display } from '@mui/system';
import * as api from '../api';
import {CREATE, DELETE, FETCH_ALL, FETCH_MORE, EDIT_MODAL, UPDATE} from '../constant/actionType'

export const getPosts = () => async (dispatch) =>{
    try {
        const { data } = await api.getPosts();
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getPostsProfile = (id) => async (dispatch) => {
    try{
        // console.log("get post profile ",id)
        const { data } = await api.getPostsProfile(id);
        // console.log(data)
        if(data == null) {
            data = 0
        }
        dispatch({type: FETCH_ALL, payload: data})
    }catch(err){
        console.log(err)
    }
}

export const getMorePost = (skipId) => async (dispatch) => {
    try{
        const { data } = await api.getMorePosts(skipId);
        console.log(data)
        if(data == null){
            return null
        }
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