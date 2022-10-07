import {CREATE,UPDATE,LIKE, DELETE,FETCH_ALL,FETCH_MORE} from '../constant/actionType'

export default (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            // console.log("Fetch:", action.payload)
            return action.payload;
        case FETCH_MORE:
            return [...posts, ...action.payload];
        case CREATE:
            // console.log("CreateL ", action.payload)
            return [...posts, action.payload];      
        case DELETE:
            return posts.filter((post)=>(post.Id!==action.payload));
        case UPDATE:
            return posts.map((post)=>(post.Id===action.payload.Id?action.payload:post))
        default:
            return posts;
    }
}