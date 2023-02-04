import {EDIT_ACC} from '../constant/actionType'

export default (state={authData: null}, action) =>{
    switch (action.type){
        case EDIT_ACC: 
            // console.log("edit set")
            // console.log(action.data)

            // console.log(localStorage.getItem('profile')
            // localStorage.setItem('profile', JSON.parse(localStorage.getItem('profile'))['token'])
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        default:
            return state;
    }
}

// export default userReducer