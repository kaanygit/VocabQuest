import { GUESS_WORD_TYPES } from "./guess-word.types";

export const addGuessWord = (guessword: any) => ({
  type: GUESS_WORD_TYPES.SET_GUESS_WORD,
  payload: guessword,
});

export const removeGuessWord = () => ({
  type: GUESS_WORD_TYPES.REMOVE_GUESS_WORD,
});
