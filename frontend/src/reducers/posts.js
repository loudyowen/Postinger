import {CREATE,UPDATE,LIKE, DELETE,FETCH_ALL,FETCH_MORE, EMPTY_POST} from '../constant/actionType'

export default (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            // console.log("Fetch:", action.payload)
            return action.payload;
        case FETCH_MORE:
            return [...posts, ...action.payload];
        case EMPTY_POST:
            console.log("Empty payload : ", action.payload)
            return action.payload;
        case CREATE:
            // console.log("CreateL ", action.payload)
            // for(let i=0;i<posts.length-1;i++){
            //     posts[i] = posts[i+1]
            // }
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