import {CREATE,UPDATE,LIKE, DELETE,FETCH_ALL,FETCH_MORE, EMPTY_POST} from '../constant/actionType'

export default (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case FETCH_MORE:
            return [...posts, ...action.payload];
        case EMPTY_POST:
            return action.payload;
        case CREATE:
            console.log(posts)
            return [action.payload, ...posts];      
        case DELETE:
            return posts.filter((post)=>(post.Id!==action.payload));
        case UPDATE:
            return posts.map((post)=>(post.Id===action.payload.Id?action.payload:post))
        default:
            return posts;
    }
}