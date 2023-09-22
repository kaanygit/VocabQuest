"use client"
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../../component/export";
import Image from "next/image";
import TestUserPhoto from '../../../../assets/main-character.png'
import { getSession } from "next-auth/react";
import { current } from "@reduxjs/toolkit";
import session from "redux-persist/lib/storage/session";

interface ParamsProps{
    params:{
        profile:string;
    };
}

interface ProfileParams{
    name:string;
    surname:string;
    username:string;
    email:string;
    profileDescription:string;
    guessword:string[];
    friends:[];
    _id:string,
}

interface SendSessionInterface{
    id:string;
    descriptionsSend:string;
}

const initialStateSendProfile:SendSessionInterface={
    id:'',
    descriptionsSend:'',
}

const initialStateProfile:ProfileParams={
    name:'',
    surname:'',
    username:'',
    email:'',
    profileDescription:'',
    guessword:[],
    friends:[],
    _id:''
}



const ProfilePage:React.FC<ParamsProps>=({params})=>{
    const userNameParams:string=params.profile[1];

    const [getUserDetailsLoading,setGetUserDetailsLoading]=useState(false);
    const [currentUserProfileParams,setCurrentUserProfileParams]=useState<ProfileParams>(initialStateProfile);
    const [getUserHave,setGetUserHave]=useState<boolean>(true);
    
    const [sessionTrue,setSessionTrue]=useState<boolean>(false);
    const [designProfile,setDesignProfile]=useState<Boolean>(false);
    const [sendProfileDescription,setSendProfileDescription]=useState<SendSessionInterface>(initialStateSendProfile)


    useEffect(()=>{
        const fetchUserDocument=async()=>{
            try {
                console.log('üstten sonrası')
                setGetUserDetailsLoading(true);
                console.log(userNameParams);
                const response=await fetch('/api/profile/getprofile',{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({userNameParams})
                })
                if(response.ok){
                    const data=await response.json();
                    const res=data.message[0]===undefined?setGetUserHave(false):setGetUserHave(true);
                    setCurrentUserProfileParams(data.message[0]);
                    console.log('PROFİL VERİSİ',data);
                    console.log(res);
                    console.log('Profil Verisi Getirildi');
                    setGetUserDetailsLoading(false);
                }else{
                    console.log('veri getirilirken hata oluştu');
                    setGetUserDetailsLoading(false);
                }
            } catch (error) {
                console.log('Error : ',error)
                setGetUserDetailsLoading(false);
            }
        };
        fetchUserDocument();
    },[userNameParams])

    useEffect(()=>{
        const SessionCurrentUserControl=async()=>{
            const session=await getSession();
            if(currentUserProfileParams!==initialStateProfile && session?.user){
                if(currentUserProfileParams._id===session.user.id){
                    console.log(session.user.id);
                    setSendProfileDescription((prevData)=>({
                        ...prevData,
                        id:session.user.id
                    }))
                    setSessionTrue(true);
                    console.log(currentUserProfileParams._id);
                }
            }
        }
        SessionCurrentUserControl();
    },[currentUserProfileParams])

    const handleTextArea=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        const textareaValue=e.target.value;
        setSendProfileDescription((prevData)=>({
            ...prevData,
            descriptionsSend:textareaValue
        }))
    }
    const profileDesign=async()=>{
        try {
            console.log('profil düzenleme gönder'); 
            const response=await fetch('/api/profile/setProfile',{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(sendProfileDescription)
            })
            if(response.ok){
                console.log('Veri Güncellendi')
            }else{
                console.log('Veri gönderirken hata oluştu')
            }
        } catch (error) {
            setDesignProfile(false);
            console.log('Profil Düzenlerken hata oluştu : ',error);
        }
        setDesignProfile(false);
    }


    return(
        <section className="mx-auto w-full h-full flex flex-col p-24 justify-center items-center text-3xl font-bold dark:bg-dark-color-1">
            <div className="flex flex-col w-full h-full p-5  rounded-lg shadow-xl border bg-gray-200">
                {getUserDetailsLoading?<LoadingComponent/>:(
                    getUserHave?(
                        <>
                            <div className="flex flex-row flex-wrap w-full justify-center items-center">
                                <div className="flex flex-1 justify-evenly items-center">
                                    <div className="flex flex-col justify-center items-center text-center"><span>{currentUserProfileParams?.guessword.length}</span><span className="text-lg text-center">Guessing Word</span></div>   
                                    <div className="flex flex-col justify-center items-center text-center"><span>214</span><span className="text-lg text-center">Not Guess Word</span></div>   
                                    <div className="flex flex-col justify-center items-center text-center"><span>21</span><span className="text-lg text-center">Friends</span></div>   
                                </div>
                                <div className="flex flex-1 justify-center ">
                                    <Image src={TestUserPhoto} width={100} alt="user_photo.png" className="rounded-full border-4"/>
                                </div>
                                <div className="flex flex-1 justify-end">
                                    {sessionTrue?(
                                        designProfile?(
                                            <button onClick={profileDesign} type="button" className="mr-10 py-1 px-4 mt-5 justify-center items-center text-center flex font-medium text-white rounded-lg transform duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 text-lg">Profili Düzenlemeyi Onayla</button>
                                        ):(
                                            <button onClick={()=>setDesignProfile(true)} type="button" className="mr-10 py-1 px-4 mt-5 justify-center items-center text-center flex font-medium text-white rounded-lg transform duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 text-lg">Profili Düzenle</button>
                                        )
                                    ):(
                                        <button type="button" className="mr-10 py-1 px-4 mt-5 justify-center items-center text-center flex font-medium text-white rounded-lg transform duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 text-lg">Add Friend</button>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center mt-10">
                                <span>{currentUserProfileParams.name +" "+ currentUserProfileParams.surname}</span>
                                <span className="text-gray-700 font-medium text-lg mt-4">@{currentUserProfileParams.username}</span>
                                {designProfile?(
                                    <textarea onChange={handleTextArea} className="mt-4 mb-10 p-3 rounded-lg" placeholder="Profile Content" name='designProfileContent' rows={5} cols={50} />
                                ):(
                                    <span className="mt-4 mb-10">Kullanıcının içeriği istediği kendinden bahsetmek istediği alan</span>
                                )}
                            </div>
                        </>
                    ):(
                        <span className="flex justify-center items-center text-center">Aradığınız Kullanıcı Bulunamadı</span>
                    )
                    

                )}
            </div>
        </section>
    )
}


export default ProfilePage;