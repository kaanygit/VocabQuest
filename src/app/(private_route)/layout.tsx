import { getServerSession } from "next-auth";
import { authOptions } from "../(admin)/api/auth/[...nextauth]/route";
import { LoadingComponent } from "@/component/export";
import { Suspense } from "react";
import { ChildrenProps } from "../types/types";
import { redirect } from "next/navigation"




export default async function PrivateLayout({children}:ChildrenProps){
    const session=await  getServerSession(authOptions);

    if(!session?.user) redirect("/");

    return <Suspense fallback={<LoadingComponent/>}>{children}</Suspense>
}