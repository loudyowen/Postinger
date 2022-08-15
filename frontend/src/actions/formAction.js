import * as api from '../api';
import {CREATE} from '../constant/actionType'

export const createForm = (form) => async (dispatch) =>{
    try{
        const { data } = await api.createFormApi(form)
        console.log(data)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}