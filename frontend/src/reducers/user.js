import {EDIT_ACC} from '../constant/actionType'

export default (state={authData: null}, action) =>{
    switch (action.type){
        case EDIT_ACC: 
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        default:
            return state;
    }
}