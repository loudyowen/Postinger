import {CREATE,AUTH} from '../constant/actionType'

export default (form = {}, action) => {
    switch(action.type){
        case CREATE:
            return [...form, action.payload];
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...StaticRange, authData: action?.data}
        default:
            return form;
    }
}