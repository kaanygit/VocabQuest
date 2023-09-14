"use client"
import { Fragment, useEffect, useRef, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { GrCircleInformation } from "react-icons/gr";
import { ImGithub } from "react-icons/im";
import { toast } from "react-toastify";



interface initialValueTS{
    name:string;
    surname:string;
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
  }
  const initialValue:initialValueTS={
    name:"",
    surname:"",
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  }


const SignUpComponent:React.FC=()=>{
    const [formValue,setFormValue]=useState<initialValueTS>(initialValue);
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [waitLogin,setWaitLogin]=useState(false);
    const buttonWait=useRef<HTMLButtonElement|null>(null);
    const {name,surname,username,email,password,confirmPassword}=formValue;
    const resetFormValue=()=>setFormValue(initialValue);
  
    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    };
    const handleChance=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setFormValue({...formValue,[name]:value});
    };
  
    const handleFormSubmit=async (e:React.ChangeEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setWaitLogin(true);
      if(confirmPassword!==password){
          toast.error("Passwords not equal");
          setWaitLogin(false);
          return;
      }else{
          try {
              console.log(formValue);
              const res=await fetch("/api/auth/users",{
                  method:"POST",
                  body:JSON.stringify(formValue),
              })
              if(res.status==423){
                  toast.error("Username in already in use");
              }else if(res.status==422){
                  toast.error("Email in already in use");
              }else{
                  const data=await res.json();
                  console.log(data);
              }
              setWaitLogin(true);
          } catch (error) {
              console.error(error);
              setWaitLogin(false);
          }
      }
      setWaitLogin(false);
  };
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
        <Fragment>
            <form onSubmit={handleFormSubmit}>
                <div className="pt-5 w-full">
                    <input className='w-3/4 bg-blue-100 p-2 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 rounded-lg' name='name' type='text' value={name} placeholder='Name' onChange={handleChance}  required/>
                </div>
                <div className="pt-5 w-full">
                    <input className='w-3/4 bg-blue-100 p-2 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 rounded-lg' name='surname' type='text' value={surname} placeholder='Username' onChange={handleChance}  required/>
                </div>
                <div className="pt-5 w-full">
                    <input className='w-3/4 bg-blue-100 p-2 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 rounded-lg' name='username' type='text' value={username} placeholder='Username' onChange={handleChance}  required/>
                </div>
                <div className="pt-5 w-full">
                    <input className='w-3/4 bg-blue-100 p-2 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 rounded-lg' name='email' type='email' value={email} placeholder='Email' onChange={handleChance}  required/>
                </div>
                <div className='pt-5 relative w-full'>
                    <input type={`${!showPassword?'password':'text'}`} name='password' value={password} onChange={handleChance} placeholder='Password'  required  className='w-3/4 bg-blue-100 p-2 placeholder-gray-400 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg pr-12' />
                    <button type='button'  className='asdas absolute right-2 top-0.5 transform -translate-x-14 translate-y-5 text-xl z-10  p-2' onClick={handleShowPassword}>{!showPassword?<AiOutlineEye/>:<AiOutlineEyeInvisible/>}</button>
                </div>
                <div className='pt-5 relative w-full'>
                    <input type="password" name='confirmPassword' value={confirmPassword} onChange={handleChance} placeholder='Confirm Password'  required  className='w-3/4 bg-blue-100 p-2 placeholder-gray-400 focus:ring-offset-1 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg pr-12' />
                </div>
                <div className='w-full pt-5 px-12  text-center items-center justify-center flex text-sm'>
                    <p className='text-gray-400 flex flex-row'><GrCircleInformation/>Use at least 8 characters, one uppercase, one lowercase and one number.</p>
                </div>
                <div className='pt-5'>
                    <button className='w-3/4 bg-blue-2 p-2 rounded-xl text-white' type='submit' ref={buttonWait}>Register</button>
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
        </Fragment>
    )
}

export default SignUpComponent;