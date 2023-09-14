"use client"
import Image from 'next/image'
import { useState,useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Character from '../assets/main-character.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthComponent, LoadingComponent } from '@/component/export';
import {useSession} from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Home() {
  const [showPageTransition,setShowPageTransition]=useState<boolean>(false);
  const {data:session,status}=useSession();

  useEffect(()=>{
    setShowPageTransition(true);
  },[])
  return (
    status==="unauthenticated"?(
      <Transition show={showPageTransition} enter='transition-opacity duration-1000' enterFrom='opacity-0' enterTo='opacity-100'>
          <main className="flex flex-row  h-full items-center justify-between px-24 py-36 w-full">
            <div className="relative flex flex-1 flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
              <span className='text-5xl'>Sign in now start using our english words guessing application</span>
              <span className='justify-start flex w-full pt-8'>If you dont have an account, create it now <button className='text-blue-1 pl-2' >Register</button></span>
            </div>
            <div className='flex-1 relative mx-auto'>
              <Image src={Character} alt='home-page-character' className="animate-image"/>  
            </div>   
            <div className='flex-1 w-full h-full justify-center items-center text-center'>
              <AuthComponent/>
            </div> 
        </main>
      <ToastContainer/>
      </Transition>
    ):status==="loading"?(<LoadingComponent/>):(redirect('/dashboard'))

  )
}
