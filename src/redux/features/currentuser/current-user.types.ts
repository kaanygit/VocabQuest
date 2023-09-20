export enum CURRENT_USER_TYPES{
    SET_CURRENT_USER_DATA="SET_CURRENT_USER_DATA",
    CLEAR_CURRENT_USER_DATA="CLEAR_CURRENT_USER_DATA"
}


export interface CurrentUserInterface{
    username:string;
}