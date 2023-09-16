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
        if(darkmode==='true'){
            document.documentElement.classList.add('dark'); 
            document.body.style.backgroundColor = '#222831'; 
        }else{
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = '#f6f7f7';
        }
    },[darkmode])
    const handleDarkmode=()=>{
        localStorage.setItem('darkmode','false');
        setDarkmode('false');
    }
    const handleSunmode=()=>{
        localStorage.setItem('darkmode','true');
        setDarkmode('true');
    }
    return(
        <nav className="flex w-full h-full items-center px-16 py-12 dark:bg-dark-color-1 dark:text-white transform duration-300 ease-in-out bg-sectionColor border-b shadow-2xl shadow-indigo-500/40" >
            <div className='flex-1 flex justify-stars'>
                <label className="pr-2 text-3xl">VocabQuest</label>
            </div>
            <div className='flex-1 justify-end flex text-2xl text-center items-center'>
                <select defaultValue="A1" className="mr-5 rounded-lg flex justify-center items-center text-center dark:bg-dark-color-1">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                </select>
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