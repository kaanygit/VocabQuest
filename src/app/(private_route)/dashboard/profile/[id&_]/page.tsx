"use client"

interface ParamsProps{
    params:{
        'id&_':string;
    }
}


const ProfileIdPage:React.FC<ParamsProps>=({params})=>{
    return(
        <section className="mx-auto w-full h-full flex flex-col justify-center items-center text-3xl font-bold bg-gray-200">
            Profile Page {params["id&_"]}
        </section>
    )
}

export default ProfileIdPage