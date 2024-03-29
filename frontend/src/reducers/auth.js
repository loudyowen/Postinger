import {AUTH, LOG_OUT} from '../constant/actionType'
import Cookies from 'js-cookie';

const authReducer = (state={authData: null}, action) =>{
    switch (action.type){
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({...action?.data.userData}))
            Cookies.set('token', action?.data.token)
            return {...state, authData: action?.data}
        case LOG_OUT:
            localStorage.removeItem('profile')
            return{...state, authData: null}
        default:
            return state;
    }
}

export default authReducer