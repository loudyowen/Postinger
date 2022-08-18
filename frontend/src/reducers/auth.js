import {AUTH} from '../constant/actionType'

const authReducer = (state={authData: null}, action) =>{
    switch (action.type){
        case AUTH: 
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...StaticRange, authData: action?.data}
        default:
            return state;
    }
}

export default authReducer