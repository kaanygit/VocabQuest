// import { NextResponse } from "next/server";
// import startDatabase from "../../../../../lib/database";
// import UsersModel from "../../../../../lib/models/user";
// import { getSession } from "next-auth/react";

// export async function GET(req:any){
//     const session=await getSession();
    
//         await startDatabase();
//         const userId = session.user.id;

//         console.log(session.user.id);
        
//         const findByGetGuessWords=await UsersModel.findById(session.user.id);
        
//         if (!findByGetGuessWords) {
//             return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
//         }
    
//         const guesswordLists=findByGetGuessWords.guessword;
//         console.log(guesswordLists);
        
//         return NextResponse.json({ guesswords: guesswordLists }, { status: 200 });

    

// };

import { NextResponse } from "next/server";
import startDatabase from "../../../../../lib/database";
import UsersModel from "../../../../../lib/models/user";
import { getSession } from "next-auth/react";

export async function GET(req:any) {
  try {
    const session = await getSession();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "Oturum bulunamadı veya kullanıcı kimliği eksik" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    await startDatabase();
    const findByGetGuessWords = await UsersModel.findById(userId);

    if (!findByGetGuessWords) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    const guesswordLists = findByGetGuessWords.guessword;

    return NextResponse.json({ guesswords: guesswordLists }, { status: 200 });
  } catch (error) {
    console.error("Hata oluştu:", error);
    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 500 });
  }
}
