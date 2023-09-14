"use client"
import { ChildrenProps } from '@/app/types/types'
import {SessionProvider} from 'next-auth/react'



export default function AuthProvider({children}:ChildrenProps){
    return <SessionProvider>{children}</SessionProvider>
}