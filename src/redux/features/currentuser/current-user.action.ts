import { CURRENT_USER_TYPES } from "./current-user.types"



export const setUser=(username:any)=>({
    type:CURRENT_USER_TYPES.SET_CURRENT_USER_DATA,
    payload:username
});

export const clearUser=()=>({
    type:CURRENT_USER_TYPES.CLEAR_CURRENT_USER_DATA
});