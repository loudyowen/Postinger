import {combineReducers} from "redux";

import posts from './posts';
import auth from './auth';
import user from './user';
import comments from './comments';

export default combineReducers({
    posts, comments, auth, user
})