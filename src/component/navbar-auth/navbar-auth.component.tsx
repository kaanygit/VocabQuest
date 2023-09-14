"use client"
import Image from "next/image";
import { useState , useEffect} from "react";
import {IoMdSettings} from 'react-icons/io'
import {AiFillBell} from 'react-icons/ai'
import {LuLogOut} from 'react-icons/lu'
import {FiSun} from 'react-icons/fi'
import {HiOutlineMoon} from 'react-icons/hi'
import { signOut } from 'next-auth/react';
import Link from 'next/link'

const NavbarAuthComponent:React.FC=()=>{
    const [darkmode,setDarkmode]=useState<string|null>(localStorage.getItem('darkmode'));
    useEffect(()=>{
        setDarkmode(localStorage.getItem('darkmode'));
    },[])
    const handleDarkmode=()=>{
        localStorage.setItem('darkmode','false');
        setDarkmode('false');
    }
    const handleSunmode=()=>{
        localStorage.setItem('darkmode','true');
        setDarkmode('true');
    }
    return(
        <nav className="flex w-full h-full items-center px-16 py-12 " >
            <div className='flex-1 flex justify-stars'>
                <label className="pr-2 text-3xl">VocabQuest</label>
            </div>
            <div className='flex-1 justify-end flex text-2xl text-center items-center'>
                <Link href='/dashboard/settings' className='pr-5'><IoMdSettings/></Link>
                <button type='button' className='pr-5'>
                    <AiFillBell/>
                </button>
                <button className='pr-5 ' onClick={()=>signOut()}><LuLogOut/></button>
                {darkmode==="true"?(
                    <button className="pr-5 text-2xl font-black" onClick={handleDarkmode}><HiOutlineMoon/></button>
                ):(
                    <button className="pr-5 text-2xl font-black" onClick={handleSunmode}><FiSun/></button>
                )}
            </div>
        </nav>
    )
}

export default NavbarAuthComponent;