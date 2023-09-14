"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";



interface initialFormValue{
    email:string;
    password:string;
}
const initialForm:initialFormValue={
    email:"",
    password:""
}


const SignInComponent:React.FC=()=>{
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [formValue,setFormValue]=useState<initialFormValue>(initialForm);
    // const router=useRouter();

    const [waitLogin,setWaitLogin]=useState(false);
    const buttonWait=useRef<HTMLButtonElement|null>(null);

    const resetFormValue=()=>setFormValue(initialForm);
    const {email,password}=formValue;

    const handleChance=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setFormValue({...formValue,[name]:value});
    }

    const handleForm=async (e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setWaitLogin(true);
        const res=await signIn("credentials",{
            email,password
        });
        await setWaitLogin(false);
        if(res?.error){
            setWaitLogin(false);
            return console.log(res.error);
        }
        // router.replace("/profile");
        console.log(formValue);
        resetFormValue();
        setWaitLogin(false);
    };
    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }

    useEffect(()=>{
        if(waitLogin){
            buttonWait.current?.setAttribute('disabled','true');
            buttonWait.current?.classList.add('bg-blue-400')
        }else{
            buttonWait.current?.classList.remove('bg-blue-400');
            buttonWait.current?.removeAttribute('disabled');
        }
        
    }, [waitLogin]);

    return(
        <>
            <form onSubmit={handleForm}>
                <div>
                    <input className='w-3/4 bg-blue-100 p-2 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 rounded-lg' name='email' type='email' value={email} placeholder='Email' onChange={handleChance}  required/>
                </div>
                <div className='pt-5 relative w-full'>
                    <input type={`${!showPassword?'password':'text'}`} name='password' value={password} onChange={handleChance} placeholder='Password'  required  className='w-3/4 bg-blue-100 p-2 placeholder-gray-400 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg pr-12' />
                    <button type='button'  className='asdas absolute right-2 top-0.5 transform -translate-x-14 translate-y-5 text-xl z-10  p-2' onClick={handleShowPassword}>{!showPassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                </div>
                <div className='pt-5'>
                    <button ref={buttonWait} className='w-3/4 bg-blue-2 p-2 rounded-xl text-white' type='submit' >Login</button>
                </div>
            </form>
            <div className='text-sm pt-3'>
                <p>Or countinue with</p>
            </div>
            <div className='flex flex-row 3/4 w-full justify-center text-3xl pt-5'>
                <div className='flex-1'><span className=' text-center justify-center items-center flex'><FcGoogle className='cursor-pointer'/></span></div>
                <div className='flex-1'><span className=' text-center justify-center items-center flex text-blue-2 '><BsFacebook className='cursor-pointer'/></span></div>
                <div className='flex-1'><span className=' text-center justify-center items-center flex '><ImGithub className='cursor-pointer'/></span></div>
            </div>

        </>
    )
}

export default SignInComponent