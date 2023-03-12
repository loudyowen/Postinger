import {CREATE_POST,FETCH_ALL_POST,FETCH_MORE_POST, EMPTY_POST, DELETE_POST, UPDATE_POST} from '../constant/actionType'

export default (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL_POST:
            return action.payload;
        case FETCH_MORE_POST:
            return [...posts, ...action.payload];
        case EMPTY_POST:
            return action.payload;
        case CREATE_POST:
            return [action.payload, ...posts];      
        case DELETE_POST:
            return posts.filter((post)=>(post.Id!==action.payload));
        case UPDATE_POST:
            return posts.map((post)=>(post.Id===action.payload.Id?action.payload:post))
        default:
            return posts;
    }
}