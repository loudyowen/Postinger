import * as api from '../api'
import {EDIT_ACC} from '../constant/actionType'

export const editAccount = (form) => async(dispatch) => {
    try{
        const {data} = await api.editAccount(form)
        dispatch({type: EDIT_ACC, data: data.data})
    }catch(err){
        console.log(err)
    }
}