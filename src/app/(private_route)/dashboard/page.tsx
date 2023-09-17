"use client"
import { Transition } from "@headlessui/react"
import React,{ useEffect, useState } from "react"
import {UseAppSelector} from '../../../redux/hooks'
import { Word } from "../../../redux/features/words/words.types"
import {WordsList} from '../../../redux/features/words/fetch-words'
import { toast } from "react-toastify"
import {FaRegLightbulb} from 'react-icons/fa'
import { getSession, useSession } from "next-auth/react"
import { Session } from "next-auth"
import axios from "axios"

interface InitialWordInterface{
    english:string;
    turkish:string[];
}
interface GetRandomWord{
    _id:string;
    english:string;
    turkish:[];
    _v:number;
}
interface SendGuessWord{
    userId:string;
    englishWord:string;
}
const InitialState:InitialWordInterface={
    english:'',
    turkish:[]
}


const DashboardPage:React.FC=()=>{
    const { data: session, status }=useSession();
    const getList:any=UseAppSelector((state)=>state.wordsReducers.words)!==null?WordsList():null;
    const getWords:Word[]=UseAppSelector(state=>state.wordsReducers.words);
    const [showPageTransition,setShowPageTransition]=useState<boolean>(false);
    const [formValue,setFormValue]=useState<InitialWordInterface>(InitialState);
    const [randomWord,setRandomWord]=useState<GetRandomWord>(undefined);
    const [knowWord,setKnowWord]=useState<number>(0);
    const [popupOpen,setPopupOpen]=useState<boolean>(false);
    const [guessSendsWords,setSendsGuessWords]=useState<SendGuessWord>();
    const darkMode:string=localStorage.getItem('darkmode');

    const {english,turkish}=formValue;
    const resetFormValue=()=>setFormValue(InitialState);
    const handleFormChance=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setFormValue({...formValue,[name]:value});
    };
    const handleFormSubmit=(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            console.log(formValue);
            const turkishValue:string=formValue.turkish.toString().toLocaleLowerCase().trim();
            randomWord.turkish.map(async(word:string)=>{
                if(word===turkishValue){
                    console.log('Kelime Bildiniz Tebrikler');
                    setKnowWord(1);
                    document.body.style.backgroundColor = '#22c55e'; 
                    //findByIdGuessWord Update
                    try {
                        console.log(guessSendsWords);
                        const response=await fetch('/api/auth/setword',{
                            method:"PUT",
                            headers:{
                                'Content-Type':'application/json',
                            },
                            body:JSON.stringify(guessSendsWords)
                        });
                        if(response.ok){
                            console.log("Veri Başarılı bir şekilde güncellendi ! ");
                        }else{
                            console.error('Veri Güncellenme sırasında sorun oluştu !!!');
                        }
                    } catch (error) {
                        console.log('Error : ', error);     
                    }
                    //
                    setTimeout(()=>{
                        resetFormValue();
                        HandleRandomWords();
                        setKnowWord(0);
                        setPopupOpen(false);
                        darkMode==='true'?document.body.style.backgroundColor = '#222831':document.body.style.backgroundColor = '#f6f7f7';  
                    },1000)   
                }else{
                    setKnowWord(2);
                    console.log('Kelimeyi bilemediniz lütfen tekrar dene ')
                    document.body.style.backgroundColor = '#dc2626'; 
                    setTimeout(()=>{
                        setKnowWord(0);
                        darkMode==='true'?document.body.style.backgroundColor = '#222831':document.body.style.backgroundColor = '#f6f7f7';  
                    },1000);   
                }
            });
        } catch (error) {
            toast.error('Hata oluştu');
        }
    };
    const HandleRandomWords=async()=>{
        const words:Word[]=getWords;
        const wordsLength:number=getWords.length;

        // indexis in the session GetGuessingWords
 
        //
        
        const randomWord:number=Math.floor(Math.random()*wordsLength);
        const indexWord:any=words[randomWord.toString()];

        // turkish answer a lot of > 1
        const aLotOfTurkishAnswer:boolean = indexWord.turkish.includes(',');
        let deneme:any = [];
      
        if (aLotOfTurkishAnswer) {
          const setWord:string[] = indexWord.turkish.split(',');
          deneme = setWord.map((word:string) => word.trim());
        }
        // 

        const sendWords={
            english:indexWord.english,
            turkish:aLotOfTurkishAnswer?deneme:[indexWord.turkish],
            _id:indexWord._id,
            _v:indexWord._v,
        }
        setRandomWord(sendWords);
        setSendsGuessWords((prevData)=>({
            ...prevData,
            englishWord:sendWords.english,
        }))
    }

    const handleOpenLambMenu=()=>{
        console.log('Fikir verme yeri açıldı');
        if(popupOpen){
            setPopupOpen(false);
        }else{
            setPopupOpen(true);
        }
    }
    
    useEffect(()=>{
        setShowPageTransition(true);
        HandleRandomWords();
    },[]);
    useEffect(()=>{
        const SetSessionData=async()=>{
            try {
                const session=await getSession();
                if(session.user){
                    setSendsGuessWords((prevData)=>({
                        ...prevData,
                        userId:session.user.id
                    }))
                    console.log(session.user);

                }else{
                    console.log('Session Gelirken Hata oluştu');
                }
            } catch (error) {
                console.log('Bilinmeyen Hata : ',error);
            }
        }
        SetSessionData();
    },[])
    useEffect(()=>{
        const SetUserGuessWord=async()=>{
            try {
                const sessions=await getSession();
                if(sessions.user){
                    const {data:response}=await axios.get('/api/data/getword');
                    console.log(response);
                }else{
                    console.log('Session Gelirken Hata oluştu');
                }
            } catch (error) {
                console.log('Error : ',error);
            }
        }
        SetUserGuessWord();
    },[session])

    useEffect(() => {
        if (randomWord) {
            setFormValue((prevForm) => ({
                ...prevForm,
                english: randomWord.english !== undefined ? randomWord.english : null,
            }));
        }
    }, [randomWord]);

    return(
        <Transition show={showPageTransition} enter='transition-opacity duration-1000' enterFrom='opacity-0' enterTo='opacity-100'>
            <section className={` mx-auto w-full h-full flex flex-col p-24 justify-center items-center text-3xl font-bold transform duration-300 ease-in-out ${knowWord === 1 ? 'bg-green-500' : knowWord === 2 ? 'bg-red-600' : 'bg-sectionColor dark:bg-dark-color-1 dark:text-white'}`}>
                <div className="flex flex-col p-5 w-full h-full justify-center items-center">
                    <span className="text-3xl mb-8">Word Guessing App</span>
                    <form onSubmit={handleFormSubmit} className="w-full flex flex-col justify-center">
                        <div className="relative flex flex-wrap flex-row justify-between items-center w-full">
                            <input className="flex-1 flex justify-center items-center text-center p-2 placeholder-gray-400 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg " value={formValue.english} placeholder="English Word" disabled/>
                            <span className="flex justify-center items-center text-center px-2">=</span>
                            <label className="relative flex-1 flex justify-center items-center text-center">
                                <input className="text-gray-800 flex-1 flex justify-center items-center text-center p-2 placeholder-gray-400 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg " value={turkish} name="turkish" onChange={handleFormChance} placeholder="Turkish Translated" />
                                <span className="absolute right-0 bottom-2 text-yellow-400 cursor-pointer text-4xl" onClick={handleOpenLambMenu} title="Clue"><FaRegLightbulb/></span>
                            </label>
                            {popupOpen?(
                                <div className="absolute bottom-16 shadow-lg -right-5  flex flex-row bg-gray-300 rounded-lg p-3 text-base transform duration-500 ease-in-out">
                                    <span>{formValue.english} = </span>
                                    {randomWord.turkish.map((word:string,index:number)=>(<span key={index}>{word},</span>))}
                                </div>
                            ):null}
                        </div>
                        <button type="submit" className={`py-2 mt-5 justify-center items-center text-center flex font-medium text-white rounded-lg transform duration-500 ease-in-out ${knowWord === 1 ? 'bg-green-600' : knowWord === 2 ? 'bg-red-700' : 'bg-blue-500 hover:bg-blue-700 '}`}>Submit</button>
                    </form>
                    <p className="mt-5 text-sm font-thin decoration-1 underline cursor-pointer">Bildir !</p>
                </div>
            </section>
        </Transition>
    )
}

export default DashboardPage
