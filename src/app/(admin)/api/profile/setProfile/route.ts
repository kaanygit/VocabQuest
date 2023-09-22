import startDatabase from "../../../../../lib/database";



export async function PUT(req:any){
    const {id,descriptionsSend}=await req.json();
    console.log(id,descriptionsSend);
    await startDatabase();
}