import Link from "next/link"

const NotFoundComponent:React.FC=()=>{
    return (
      <section className="mx-auto w-full flex-col h-screen text-3xl font-bold text-blue-400 flex flex-col justify-center items-center  pb-10 " style={{width:"1000px"}}>
          <h2 className='font-bold'>Not Found ! 😞</h2>
          <p className='mt-5'>Could not find requested resource</p>
          <Link href="/" className='mt-5'>Return Home  👈</Link>
        </section>
      )
}

export default NotFoundComponent