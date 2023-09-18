// import { NextResponse } from "next/server";
// import startDatabase from "../../../../../lib/database";
// import UsersModel from "../../../../../lib/models/user";



// export async function GET(request:any){
//     const {userNameParams}=await request.json();
//     await startDatabase();
//     console.log(userNameParams);
//     const findByIdUserDetails=UsersModel.findOne({username:userNameParams});
//     console.log(findByIdUserDetails);

//     return NextResponse.json({message:'Veri Başarılı bir şekilde getirildi'},{status:200}); 
// }

import { NextResponse } from "next/server";
import startDatabase from "../../../../../lib/database";
import UsersModel from "../../../../../lib/models/user";

export async function GET(request: any) {
    const userNameParams = request.query.userNameParams; // query string'den alınan veri

  await startDatabase();
  console.log(userNameParams);
  const findByIdUserDetails = await UsersModel.findOne({ username: userNameParams });
  console.log(findByIdUserDetails);

  return NextResponse.json({ message: 'Veri Başarılı bir şekilde getirildi' }, { status: 200 });
}
