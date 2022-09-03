import {CREATE,UPDATE,LIKE, DELETE,FETCH_ALL, EDIT_MODAL} from '../constant/actionType'

export default (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];      
        case DELETE:
            return posts.filter((post)=>(post.Id!==action.payload));
            // return posts.filter((post)=>(console.log(post.Id, action.payload)))
        case EDIT_MODAL:
            return action.payload;
        default:
            return posts;
    }
}