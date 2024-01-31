"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import UserLinks from './UserLinks';

const links = [
    {id: 1, title: "Home Page", link: "/"},
    {id: 2, title: "Menu", link: "/menu"},
    {id: 3, title: "Working Hours", link: "/"},
    {id: 4, title: "Contact", link: "/"},

]
export default function Menu() {
    const [open, setOpen] = useState(false);
    let isLogin = true
    // useEffect(()=>console.log(open),[open])
  return (
    <div className=''>

       { 
         open ?
            <Image
            src="/close.png"
            alt='img'
            height={20}
            width={20}
            onClick={()=>{
                console.log("clicked")
                setOpen(()=>false)
            }}
            />
            :
            <Image
            src="/open.png"
            alt='img'
            height={20}
            width={20}
            onClick={()=>{
                console.log("clicked")

                setOpen(()=>true)
            }}

            />
        }

        {
            open && 

            <div className='absolute flex flex-col left-0 top-28 bg-red-500 text-white text-xl p-5 w-full   justify-center items-center gap-8 z-10'
            onClick={()=>{
                console.log("clicked")
                setOpen(()=>false)
            }}
            >
                {
                    links.map(e=>
                        <Link href={e.link} key={e.id} >
                            {e.title}
                        </Link>
                        )
                }
                
                <UserLinks/>
            </div>
            }
    </div>
  )
}
