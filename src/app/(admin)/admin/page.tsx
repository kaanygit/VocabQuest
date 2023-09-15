"use client"
import React from "react";
import { useState } from "react";
import axios from 'axios'
import { UseAppSelector, useAppDispatch } from "../../../redux/hooks";
import { addWord } from "../../../redux/features/words/words.action";

interface FormInterface{
    formText:string;
};
const FormInitialValue={
    formText:''
}


const AdminPage:React.FC=()=>{
    const [formValue,setFormValue]=useState<FormInterface>(FormInitialValue);
    const [selectedOption,setSelectedOption]=useState<string>('')
    const dispatch=useAppDispatch();

    const {formText}=formValue;
    const handleChanceTextArea=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const newTextArea=e.target.value;
        setSelectedOption(newTextArea);
        setFormValue((prevForm)=>({
            ...prevForm,
            formText:newTextArea
        }))
    }

    const handleFormSubmit=(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log('form verileri');
        console.log(formValue.formText.trim().toLowerCase());
        const terim:string='about hemen hemen [zf.] aşağı yukarı [zf.] yaklaşık [zf.]'
        const kelime=terim.split(' ');
        const liste=kelime.map(kelime=>kelime.replace('[zf.]',''));
        console.log(liste);
        console.log(JSON.stringify(terim, null, 2));
    }

    const handleWordsSendDB=async()=>{
        try {
            const {data:response}=await axios.get('/api/data/words')
            const words=response.Words;
            dispatch(addWord(words));
        } catch (error) {
            console.log('Error : ',error)
        }
    }
    const words = UseAppSelector((state) => state.wordsReducers.words);
    console.log(words);


        return(
        <section className="mx-auto w-full h-screen  flex flex-col  p-24">
            <span className="text-3xl font-bold flex justify-start">Kelime ekleme yeri</span>
            <div className="w-full flex flex-col mt-3">
                <form onSubmit={handleFormSubmit} className="w-full flex flex-col">
                    <label>
                        <textarea required className="w-full place" rows={10} value={formText} name="formText" onChange={handleChanceTextArea}/>
                    </label>
                    <button type="submit" className="w-full justify-center items-center text-center flex bg-blue-500 font-medium text-white rounded-lg px-2 py-2 transform duration-500 ease-in-out hover:bg-blue-700 mr-2">Veriyi JSON Dosyasına Yazdır</button>
                </form>
                <button  type="button" onClick={handleWordsSendDB} className="mt-8 w-full justify-center items-center text-center flex bg-blue-500 font-medium text-white rounded-lg px-2 py-2 transform duration-500 ease-in-out hover:bg-blue-700 mr-2">Veriyi Gönder</button>
            </div>
            <div>
                Liste denemesi
            </div>
        </section>
    )
}

export default AdminPage