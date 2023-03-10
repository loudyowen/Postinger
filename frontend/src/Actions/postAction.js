import { display } from '@mui/system';
import * as api from '../api';
import {CREATE, DELETE, FETCH_ALL, FETCH_MORE, EDIT_MODAL,EMPTY_POST, UPDATE} from '../constant/actionType'
import {useNavigate}from 'react-router-dom'


export const getPosts = () => async (dispatch) =>{
    const navigate = useNavigate();
    try {
        const { data } = await api.getPosts();
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error)
        navigate(0)
        navigate('/home')
    }
}

export const getPostsProfile = (id) => async (dispatch) => {
    try{
        let { data } = await api.getPostsProfile(id);
        if(data == null) {
            data = 0
        }
        dispatch({type: EMPTY_POST, payload: []})
        dispatch({type: FETCH_ALL, payload: data})
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