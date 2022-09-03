import { display } from '@mui/system';
import * as api from '../api';
import {CREATE, DELETE, FETCH_ALL, EDIT_MODAL} from '../constant/actionType'

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
    try{
        const { data } = await api.postStatus(postData)
        const payload = data.data.data;
        console.log("CREATE POST CALLED!!!")
        console.log(payload)
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

export const showModal = (postId) => async (dispatch) => {
    dispatch({type: EDIT_MODAL, payload: postId})
    console.log("Edit Modal Called")
}