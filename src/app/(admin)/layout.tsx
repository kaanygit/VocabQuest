import { ChildrenProps } from "../../types/types";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import {Suspense} from 'react'
import { LoadingComponent } from "../../component/export";





export default async function AdminRoutes({children}:ChildrenProps) {
    const session=await getServerSession(authOptions);
    const roleControl=session?.user;
    const role=roleControl?.role;

    if(session){
        if(roleControl && roleControl.role==='user')redirect('/dashboard');
        return <Suspense fallback={<LoadingComponent/>}>{children}</Suspense>
    }else{
        redirect('/')
    }
}