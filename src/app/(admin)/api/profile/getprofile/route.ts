import { NextResponse } from "next/server";
import startDatabase from "../../../../../lib/database";
import UsersModel from "../../../../../lib/models/user";
import guessWordModel from "../../../../../lib/models/guess-word-model";



export async function PUT(request:any){
    const {userNameParams}=await request.json();
    await startDatabase();
    console.log(userNameParams);
    const findByIdUserDetails=await UsersModel.find({username:userNameParams});
    console.log(findByIdUserDetails);

    return NextResponse.json({message:findByIdUserDetails},{status:200}); 
}

