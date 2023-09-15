export enum WORDS_TYPES{
    SET_WORDS='SET_WORDS',
    REMOVE_WORD='REMOVE_WORD'
}
export interface Word{
    english:string;
    turkish:string;
};

export interface WordsState{
    words:Word[];
};
