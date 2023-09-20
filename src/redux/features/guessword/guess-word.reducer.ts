// import { GuessWordInterface,GUESS_WORD_TYPES } from "./guess-word.types";


// const initialState:GuessWordInterface={
//     guessword:[],
// }


// const guessWordReducer=(state=initialState,action:any)=>{
//     switch (action.type){
//         case GUESS_WORD_TYPES.SET_GUESS_WORD:
//             return{
//                 ...state,
//                 guessword:action.payload,
//             };
//         case GUESS_WORD_TYPES.REMOVE_GUESS_WORD:
//             return{
//                 ...state,
//                 guessword:null
//             };
//         default:
//             return state
//     };
// };

// export default guessWordReducer;

import { GuessWordInterface, GUESS_WORD_TYPES } from "./guess-word.types";

const initialState: GuessWordInterface = {
  guessword: [],
};

const guessWordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GUESS_WORD_TYPES.SET_GUESS_WORD:
      return {
        ...state,
        guessword: action.payload,
      };
    case GUESS_WORD_TYPES.REMOVE_GUESS_WORD:
      return {
        ...state,
        guessword: [],
      };
    default:
      return state;
  }
};

export default guessWordReducer;
