import startDatabase from "../../../../../lib/database";
import { NextResponse } from "next/server";
import guessWordModel from "../../../../../lib/models/guess-word-model";


export async function PUT(req:any){
    try {
        const {currentUserEmail}=await req.json();
        await startDatabase();
        console.log(currentUserEmail);

        const res=await guessWordModel.find({email:currentUserEmail});
        console.log(res);

        return NextResponse.json({message:res},{status:200});
    } catch (error) {
        console.log(error);
    }
}