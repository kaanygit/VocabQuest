import { CURRENT_USER_TYPES, CurrentUserInterface } from "./current-user.types";




const initialState:CurrentUserInterface={
    username:'',
}

const userReducer=(state=initialState,action:any)=>{
    switch(action.type){
        case CURRENT_USER_TYPES.SET_CURRENT_USER_DATA:
            return{
                ...state,
                username:action.payload
            }
        case CURRENT_USER_TYPES.CLEAR_CURRENT_USER_DATA:
            return{
                ...state,
                username:null
            }
        default:
            return state
    }
}

export default userReducer