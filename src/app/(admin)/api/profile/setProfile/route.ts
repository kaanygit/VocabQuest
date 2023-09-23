import { NextResponse } from "next/server";
import startDatabase from "../../../../../lib/database";
import UsersModel from "../../../../../lib/models/user";



export async function PUT(req:any){
    const {id,descriptionsSend}=await req.json();
    console.log(descriptionsSend,id);
    await startDatabase();

    const getProfileDescription = await UsersModel.findById(id);
    const ProfileDescriptionModel={
        "profileDescription":descriptionsSend
    };

    if (!getProfileDescription) {
        return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    const setProfileDescription = await UsersModel.findByIdAndUpdate(id, { descriptions: [ProfileDescriptionModel] }, { new: true });

    return NextResponse.json({message:'Profil açıklaması düzenlendi'},{status:200})
}