import {CREATE_COMMENT, DELETE_COMMENT, FETCH_ALL_COMMENT, FETCH_MORE_COMMENT,EMPTY_COMMENT, UPDATE_COMMENT} from '../constant/actionType'
export const postComment = (postData) => async (dispatch) => {
    try{
        const {data} = await api.postComment(postData)
        const payload = data.data.data;
        dispatch({type: CREATE_COMMENT, payload: payload})
        // console.log(data)
    }catch(err){
        console.log(err)
    }
}
