import {CREATE,AUTH} from '../constant/actionType'

export default (form = {}, action) => {
    switch(action.type){
        case CREATE:
            return [...form, action.payload];            
        default:
            return form;
    }
}