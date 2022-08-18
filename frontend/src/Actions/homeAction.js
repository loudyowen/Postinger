import { display } from '@mui/system';
import * as api from '../api';
import {CREATE} from '../constant/actionType'

export const postStatus = (postData, navigate) => async (dispatch) =>{
    try{
        const { data } = await api.postStatus(postData)
        dispatch({type: CREATE, data: data})
    }catch(error){
        console.log(error)
    }
}
