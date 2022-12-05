import {AUTH, LOG_OUT} from '../constant/actionType'
import Cookies from 'js-cookie';
// import { useCookies } from "react-cookie"

const authReducer = (state={authData: null}, action) =>{
    // const [cookies, setCookies] = useCookies
    switch (action.type){
        case AUTH: 
        // se
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            Cookies.set('token', action?.data.token)
            // Cookies.set('token2', "value2")
            // Cookies.set('abc', "value3")
            // localStorage.setItem('token', JSON.stringify({...action?.token}))
            return {...state, authData: action?.data}
        case LOG_OUT:
            localStorage.removeItem('profile')
            return{...state, authData: null}
        default:
            return state;
    }
}

export default authReducer