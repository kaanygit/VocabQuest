import { Model, Schema, model, models } from "mongoose";
import { MethodSignature } from "typescript";



interface UserDocumention extends Document{
    name:string;
    surname:string;
    username:string;
    email:string;
    guessword:any[];
}

const guessWordSchemas=new Schema<UserDocumention,{}>({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true,trim:true},
    guessword:{type:[],required:true,default:[]},
});

const guessWordModel=models.User||model("User",guessWordSchemas);


export default guessWordModel as Model<UserDocumention,{}>