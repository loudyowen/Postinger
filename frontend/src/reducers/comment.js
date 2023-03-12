import {CREATE_COMMENT,UPDATE_COMMENT,LIKE, DELETE_COMMENT,FETCH_ALL_COMMENT,FETCH_MORE_COMMENT, EMPTY_COMMENT} from '../constant/actionType'

export default (comments = [], action) => {
    switch(action.type){
        case FETCH_ALL_COMMENT:
            return action.payload;
        case FETCH_MORE_COMMENT:
            return [...comments, ...action.payload];
        case EMPTY_COMMENT:
            return action.payload;
        case CREATE_COMMENT:
            console.log(comments)
            return [action.payload, ...comments];      
        case DELETE_COMMENT:
            return comments.filter((comment)=>(comment.Id!==action.payload));
        case UPDATE_COMMENT:
            return comments.map((comment)=>(comment.Id===action.payload.Id?action.payload:comment))
        default:
            return comments;
    }
}