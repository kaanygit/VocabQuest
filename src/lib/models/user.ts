import {Model,model,models,Document,Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import type { DefaultSession } from 'next-auth';

interface UserDocumention extends Document{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
    guessword:[];
    role:"admin"|"user";
}

declare module 'next-auth'{
    interface Session{
        user:DefaultSession['user']&{
            role:string;
            id:string;
            username:string;
            guessword:any;
        }
    }
}

interface Methods{
    comparePassword(password:string):Promise<boolean>
};

const userDocumentSchema=new Schema<UserDocumention,{},Methods>({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true},
    guessword:{type:[],required:true,default:[]},
    role:{type:String,enum:['admin','user'],default:'user'},    
});

userDocumentSchema.pre('save',async function (next) {
    if(!this.isModified('password'))return next();
    try {
        const salting=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salting);
        next();
    } catch (error) {
        throw error;    
    }
});

userDocumentSchema.methods.comparePassword=async function(password){
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        throw error;
    }
};

const UsersModel=models.User||model("User",userDocumentSchema);

export default UsersModel as Model<UserDocumention,{},Methods>