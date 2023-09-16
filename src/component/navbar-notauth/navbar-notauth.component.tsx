"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import {useEffect,useState} from 'react'
import { FiSun } from "react-icons/fi"
import { HiOutlineMoon } from "react-icons/hi"
import { LuWholeWord } from "react-icons/lu"



const NavbarNotAuthComponent:React.FC=()=>{
    const [darkmode,setDarkmode]=useState<string|null>(localStorage.getItem('darkmode'));
    const [authModeLocal,setAuthModeLocal]=useState<string|null>(localStorage.getItem('authMode'));
    useEffect(()=>{
        setDarkmode(localStorage.getItem('darkmode'));
    },[])
    useEffect(()=>{
        setAuthModeLocal(localStorage.getItem('authMode'));
        if(authModeLocal==='true'){
            document.documentElement.classList.add('dark'); 
            document.body.style.backgroundColor = '#222831'; 
        }else{
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = '#f6f7f7';
        }
     },[authModeLocal])


    const handleDarkmode=()=>{
        localStorage.setItem('darkmode','false');
        setDarkmode('false');
    }
    const handleSunmode=()=>{
        localStorage.setItem('darkmode','true');
        setDarkmode('true');
    }

    const handAuthModeFalse=()=>{
        localStorage.setItem('authMode','false');
        setAuthModeLocal('false');
        location.reload();
    };
    const handAuthModeTrue=()=>{
        localStorage.setItem('authMode','true');
        setAuthModeLocal('true')
        location.reload();
    };

    return(
        <nav className="flex w-full h-full items-center px-16 py-12 transform duration-300 ease-in-out dark:bg-dark-color-1 bg-sectionColor" >
            <div className="flex-1  flex justify-start items-center text-center">
                <label className="pr-2 text-3xl">VocabQuest</label>
                <label className='pr-5 text-4xl'><LuWholeWord/></label>
                <Link href="/about" className="pr-5 text-xl">About</Link>
                <Link href="/contact" className="pr-5 text-xl">Contact</Link>
            </div>
            <div className="flex-1 flex justify-end items-center text-center">
                <div className='pr-5'>
                {authModeLocal==='true'?(
                    <button className=" text-xl bg-white shadow-2xl rounded-2xl px-3 py-2 text-blue-1" onClick={handAuthModeFalse}>Login</button>   
                    ):(
                    <button className=" text-xl bg-white shadow-2xl rounded-2xl px-3 py-2 text-blue-1" onClick={handAuthModeTrue}>Register</button>
                )}
                </div> 
                {darkmode==="true"?(
                    <button className="pr-5 text-2xl font-black" onClick={handleDarkmode}><HiOutlineMoon/></button>
                ):(
                    <button className="pr-5 text-2xl font-black" onClick={handleSunmode}><FiSun/></button>
                )}
            </div>
        </nav>
    )
}

export default NavbarNotAuthComponent;