import {combineReducers} from "redux"

import form from './form';
import auth from './auth'

export default combineReducers({
    form, auth
})