import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image';
import UserLinks from './UserLinks';

const links = [
  {id: 1, title: "Home Page", link: "/"},
  {id: 2, title: "Menu", link: "/menu"},
  {id: 3, title: "Working Hours", link: "/"},
 
];

const isLogin = true;

export default function Navbar() {
  
  return (
    <div className='p-5 text-red-500 border-b-red-500 border-b-2 rounded-sm flex justify-between'>
      {/* md screen navbar menu */}
      <div className='hidden md:flex gap-4'>
        {
          links.map(e=>
                    <Link href={e.link} key={e.id} >
                        {e.title}
                    </Link>
                    )
          }
      </div>
      {/* Logo */}
      <div className="logo text-xl ">
      <Link href="/" className='text-xl font-bold'>Ristorante Italiano</Link>

      </div>
      {/* menu */}
        <div className='md:hidden'>
           <Menu/>
        </div>

         {/* md screen navbar menu */}
      <div className='hidden md:flex gap-4'>
      <div className='hidden  md:flex flex-row bg-yellow-400 px-1 rounded text-white gap-1 '>
        <Image src="/phone.png" alt='img' width={15} height={15} />
        <span>111 222 333</span>
      </div>
      <UserLinks/>
      
      </div>

    </div>
  )
}
