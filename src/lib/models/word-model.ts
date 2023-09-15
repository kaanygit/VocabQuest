import {Schema, model, models} from 'mongoose'

const wordSchema=new Schema({
    eng:String,
    trk:String,
});


const WordModelA1=models.A1 || model(('A1'),wordSchema);
const WordModelA2=models.A2 || model(('A2'),wordSchema);
const WordModelB1=models.B1 || model(('B1'),wordSchema);
const WordModelB2=models.B2 || model(('B2'),wordSchema);
export {WordModelA1,WordModelA2,WordModelB1,WordModelB2};
