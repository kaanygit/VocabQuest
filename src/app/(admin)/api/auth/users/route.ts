import startDatabase from "@/lib/database";
import UsersModel from "@/lib/models/user";
import { NextResponse } from "next/server";



interface NewUserRequest{
    name:string;
    surname:string;
    username:string;
    email:string;
    passwordUp:string;
}

interface NewUserResponse{
    id:string;
    name:string;
    surname:string;
    email:string;
    username:string;
}

type NewResponse=NextResponse<{user?:NewUserResponse;error?:string}>;


export const POST=async (request:Request):Promise<NewResponse>=>{
    const body=(await request.json()) as NewUserRequest;
    await startDatabase();

    const oldUser=await UsersModel.findOne({email:body.email});
    const oldUserName=await UsersModel.findOne({username:body.username});

    if(oldUser)
        return NextResponse.json(
        {error:"Email is already in use"},
        {status:422}
    )
    if(oldUserName)
            return NextResponse.json(
            {error:"Username is already in use"},
            {status:423}           
    )

    const user=await UsersModel.create({...body});

    return NextResponse.json({
        user:{
            id:user._id.toString(),
            name:user.name,
            username:user.username,
            surname:user.surname,
            email:user.email,
            role:user.role,
        }
    })
}