import UsersModel from "../../../../../lib/models/user";
import startDatabase from "../../../../../lib/database";
import { NextResponse } from "next/server";
import { useAppDispatch } from "../../../../../redux/hooks";
import { addGuessWord } from "../../../../../redux/features/guessword/guess-word.action";

export async function PUT(req:any){
    const {englishWord,userId}=await req.json();
    await startDatabase();
    console.log(englishWord);
    const addedWord={
        'english':englishWord
    };
    console.log(addedWord);
    const findByUpdateGuess=await UsersModel.findByIdAndUpdate(userId,{$push:{guessword:addedWord}},{new:true});

    return NextResponse.json({message:"User Guess Word Updated"},{status:200});
};

