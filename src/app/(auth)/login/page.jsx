"use client"

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";


export default function LoginPage() { 
  
  const { data: session, status } = useSession();
  const [login, setLogin] = useState({email: "",
  password: "" });
  const [loginMsg, setLoginMsg] = useState("");
  const router = useRouter();
  useEffect(()=>{
    
    console.log("session:", session, status);
  }, [session, status])
  if(status === "authenticated") router.push("/")
  if(status === "loading") return <div>Loading...</div>
  
  const handleLogin = async (e)=>{
    e.preventDefault();
    // console.log("login: ", login);
    let user = await signIn("credentials", {
      ...login,
      redirect: false,
      
    });
    if(user.error)
    setLoginMsg(()=>user.error)
  else
  toast.success("Logging User in...")
    // alert(JSON.stringify(user))
    console.log("userInfo: ", user)
  }

  

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
       <Toaster
        position="top-center"
        reverseOrder={true}
        />
    <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
    <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
        <Image
          src={"/loginBg.png"} 
          alt='img'
          className='object-contain'
          fill
         />
      </div>
      <div className="p-3 flex flex-col gap-5 md:w-1/2">
        <h1 className='text-3xl'>
          Welcome
        </h1>
        
    {/* Login */}
    <form onSubmit={e=>handleLogin(e)} className="mb-1 gap-2">
      <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
        E-mail
      </label>
      <input
        type="email"
        id="username"
        name="username"
        required
        value={login.email}
        onChange={(event) => setLogin((prev) => ({ ...prev, email: event.target.value }))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>
    <div>
      
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        value={login.password}
        onChange={(event) => setLogin((prev) => ({ ...prev, password: event.target.value }))}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="text-center">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
       >
        Login
      </button>
      <br />
{      !!loginMsg &&  <span>{loginMsg}</span>
}      <div className="text-center">
    <Link href={"/register"} className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800">
      Click here to register.
    </Link>
  </div>
    </div>
    </form>
    <hr />
        <button className='text-black rounded  flex gap-2 shadow-md p-3 ring-1 hover:bg-slate-300'>
          <Image
            src="/google.png"
            alt='img'
            width={20}
            height={20}
            className='object-contain'

           />
          <span className='text-center' 
          onClick={()=>signIn("google")}
          >
           Sign in with Google
          </span>
        </button>
        {/* FB signIn */}
        {/* <button className='text-black rounded  flex gap-2 shadow-md p-3 ring-1 hover:bg-slate-300'>
          <Image
            src="/facebook.png"
            alt='img'
            width={20}
            height={20}
            className='object-contain'
           />
          <span className='text-center'>
           Sign in with Facebook
          </span>
        </button> */}

      </div>
      </div>
      
    </div>
  )
}
