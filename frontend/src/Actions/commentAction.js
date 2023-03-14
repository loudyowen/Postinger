import {CREATE_COMMENT, DELETE_COMMENT, FETCH_ALL_COMMENT, FETCH_MORE_COMMENT,EMPTY_COMMENT, UPDATE_COMMENT} from '../constant/actionType'
import * as api from '../api';
export const postComment = (postData) => async (dispatch) => {
    try{
        const {data} = await api.postComment(postData)
        const payload = data.data.data;
        // console.log(payload)
        dispatch({type: CREATE_COMMENT, payload: payload})
        // console.log(data)
    }catch(err){
        console.log(err)
    }
}
export const getComment = (postId) => async (dispatch) => {
    try{
        const{ data } = await api.getComment(postId)
        dispatch({type: FETCH_ALL_COMMENT, payload: data})
    }catch(err){
        console.log(err)
    }
}