import { WORDS_TYPES } from "./words.types";



export const addWord=(word:any)=>({
    type:WORDS_TYPES.SET_WORDS,
    payload:word
});

export const removeWord=()=>({
    type:WORDS_TYPES.REMOVE_WORD,
})