import { display } from '@mui/system';
import * as api from '../api';
import {CREATE_POST, DELETE_POST, FETCH_ALL_POST, FETCH_MORE_POST,EMPTY_POST, UPDATE_POST} from '../constant/actionType'
import { useDispatch } from 'react-redux';
import {LOG_OUT} from '../constant/actionType'


export const getPosts = (navigate) => async (dispatch) =>{
    try {
        const { data } = await api.getPosts();
        dispatch({type: FETCH_ALL_POST, payload: data})
    } catch (error) {
        if(error.response.status=='401'){
            dispatch({type: LOG_OUT})
            navigate(0)
            navigate('/home')
        }else{
            console.log(error)
        }
    }
}

export const getPostsProfile = (id) => async (dispatch) => {
    try{
        let { data } = await api.getPostsProfile(id);
        if(data == null) {
            data = 0
        }
        dispatch({type: EMPTY_POST, payload: []})
        dispatch({type: FETCH_ALL_POST, payload: data})
    }catch(err){
        console.log(err)
        
    }
}

export const getMorePost = (skipId) => async (dispatch) => {
    try{
        const { data } = await api.getMorePosts(skipId);
        if(data == null){
            return null
        }
        dispatch({type: FETCH_MORE_POST, payload: data})
        
    }catch(error){
        console.log(error)
    }
}

export const postStatus = (postData) => async (dispatch) =>{
    try{
        const { data } = await api.postStatus(postData)
        const payload = data.data.data;
        dispatch({type: CREATE_POST, payload: payload})
    }catch(error){
        console.log(error)
    }
}

export const postComment = (postData) => async (dispatch) => {
    try{
        const {data} = await api.postComment(postData)
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

export const deletePost = (postId) => async (dispatch) =>{
    try{
        await api.deletePost(postId)
        dispatch({type: DELETE_POST, payload: postId})
    }catch(error){
        console.log(error)
    }
}

export const updatePost = (id,postData) => async (dispatch) => {
    try{
        console.log("update: ",postData)
        const { data }  = await api.updatePost(id,postData)
        const  payload  = data.data.data
        dispatch({type: UPDATE_POST, payload: payload})
    }catch(error){
        console.log(error)
    }
}