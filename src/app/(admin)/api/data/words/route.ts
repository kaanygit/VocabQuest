import startDatabase from "@/lib/database";
import { WordModelA1, WordModelA2, WordModelB1,WordModelB2 } from "@/lib/models/word-model";
import { NextResponse } from "next/server";

export async function GET(req:any){
    await startDatabase();
    const Words=await WordModelA2.find();
    return NextResponse.json({Words});
}