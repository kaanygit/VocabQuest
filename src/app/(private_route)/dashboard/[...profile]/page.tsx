"use client"
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../../component/export";
import Image from "next/image";
import TestUserPhoto from '../../../../assets/main-character.png'

interface ParamsProps{
    params:{
        profile:string;
    };
}




const ProfilePage:React.FC<ParamsProps>=({params})=>{
    const userNameParams:string=params.profile[1];

    const [getUserDetailsLoading,setGetUserDetailsLoading]=useState(false);

    useEffect(()=>{
        const fetchUserDocument=async()=>{
            try {
                const response=await fetch(`/api/profile/getprofile?userNameParams=${userNameParams}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                if(response.ok){
                    console.log('Veri Getirildi');
                }else{
                    console.log('veri getirilirken hata oluştu');
                }
            } catch (error) {
                console.log('Error : ',error)
            }
        };
        fetchUserDocument();
    },[userNameParams])
    console.log(params)
    return(
        <section className="mx-auto w-full h-full flex flex-col p-24 justify-center items-center text-3xl font-bold dark:bg-dark-color-1">
            <div className="flex flex-col w-full h-full p-5  rounded-lg shadow-xl border bg-gray-200">
                {getUserDetailsLoading?<LoadingComponent/>:(
                    <>
                        <div className="flex flex-row flex-wrap w-full justify-center items-center">
                            <div className="flex flex-1 justify-evenly items-center">
                                <div className="flex flex-col justify-center items-center text-center"><span>115</span><span className="text-lg text-center">Guessing Word</span></div>   
                                <div className="flex flex-col justify-center items-center text-center"><span>214</span><span className="text-lg text-center">Not Guess Word</span></div>   
                                <div className="flex flex-col justify-center items-center text-center"><span>21</span><span className="text-lg text-center">Friends</span></div>   
                            </div>
                            <div className="flex flex-1 justify-center ">
                                <Image src={TestUserPhoto} width={100} alt="user_photo.png" className="rounded-full border-4"/>
                            </div>
                            <div className="flex flex-1 justify-end">
                                <button type="button" className="mr-10 py-1 px-4 mt-5 justify-center items-center text-center flex font-medium text-white rounded-lg transform duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 text-lg">Add Friend</button>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center mt-10">
                            <span>Yasin Kaan Yiğit</span>
                            <span className="text-gray-700 font-medium text-lg mt-4">@{userNameParams}</span>
                            <span className="mt-4 mb-10">Kullanıcının içeriği istediği kendinden bahsetmek istediği alan</span>
                        </div>
                    </>

                )}
            </div>
        </section>
    )
}


export default ProfilePage;