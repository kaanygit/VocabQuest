import { GUESS_WORD_TYPES } from "./guess-word.types";


export const addGuessWord=(word:any)=>({
    type:GUESS_WORD_TYPES,
    payload:word
});

export const removeGuessWord=()=>({
    type:GUESS_WORD_TYPES.REMOVE_GUESS_WORD
})