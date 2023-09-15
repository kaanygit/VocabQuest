import { WordsState } from "./words.types"
import { WORDS_TYPES } from "./words.types";

const initialState:WordsState={
    words:[]
};

const wordsReducers=(state=initialState,action:any)=>{
    switch (action.type){
        case WORDS_TYPES.SET_WORDS :
            return{
                ...state,
                words:action.payload,
            };
        case WORDS_TYPES.REMOVE_WORD:
            return{
                ...state,
                words:null
            }
        default:
            return state
    };
};
export default wordsReducers