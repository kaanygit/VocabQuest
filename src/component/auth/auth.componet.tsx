"use client"
import { useEffect, useState } from "react";
import SignInComponent from "./signin/sign_in.component";
import SignUpComponent from "./signup/sign_up.component";





const AuthComponent:React.FC=()=>{
    const [authModeLocal,setAuthModeLocal]=useState<string|null>(localStorage.getItem('authMode'));

    useEffect(()=>{
        setAuthModeLocal(localStorage.getItem('authMode'))
    },[authModeLocal])

    return(
        authModeLocal==='true'?(
            <SignUpComponent/>
        ):(
            <SignInComponent/>
        )
    )
}

export default AuthComponent