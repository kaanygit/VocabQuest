import { NextResponse } from "next/server";
import startDatabase from "../../../../../lib/database";
import { WordModelA1, WordModelA2, WordModelB1,WordModelB2 } from "../../../../../lib/models/word-model";

export async function GET(req:any){
    await startDatabase();
    const Words=await WordModelA1.find();
    return NextResponse.json({Words});
}