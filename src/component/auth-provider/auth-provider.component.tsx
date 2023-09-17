"use client"
import {SessionProvider} from 'next-auth/react'
import { ChildrenProps } from '../../types/types'



export default function AuthProvider({children}:ChildrenProps){
    return <SessionProvider>{children}</SessionProvider>
}