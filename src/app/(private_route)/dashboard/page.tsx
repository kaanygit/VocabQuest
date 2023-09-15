"use client"
import { WordsList } from "@/redux/features/words/fetch-words"
import { Word } from "@/redux/features/words/words.types"
import { UseAppSelector } from "@/redux/hooks"
import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"



const DashboardPage:React.FC=()=>{
    WordsList();
    const [showPageTransition,setShowPageTransition]=useState<boolean>(false);
    const getWords:Word[]=UseAppSelector(state=>state.wordsReducers.words);
    console.log(getWords);
    useEffect(()=>{
        setShowPageTransition(true);
      },[])
    return(
        <Transition show={showPageTransition} enter='transition-opacity duration-1000' enterFrom='opacity-0' enterTo='opacity-100'>
            <section className="mx-auto w-full h-full flex flex-col justify-center items-center text-3xl font-bold bg-gray-200">
                {getWords.map((data:any,index:number)=>(
                    <li key={index}>{data.english} : <span>{data.turkish}</span></li>
                ))}
            </section>
        </Transition>
    )
}

export default DashboardPage
