import * as api from '../api'
import {EDIT_ACC} from '../constant/actionType'

export const editAccount = (form) => async(dispatch) => {
    try{
        const {data} = await api.editAccount(form)
        console.log(data)
    }catch(err){
        console.log(err)
    }
}