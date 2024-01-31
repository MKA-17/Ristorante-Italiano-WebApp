"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const slides = [
    {id: 1, title: "always fresh!", image:"/temporary/m3.png"},
    {id: 2, title: "We'll deliver ur Order!", image:"/temporary/p2.png"},
    {id: 3, title: "The Best Pizza!", image:"/slide1.png"},
    
]

export default function Slider() {
    const [slideNo, setSlideNo] = useState(0);
    useEffect(()=>{
        const intervaslId = setInterval(()=>setSlideNo(prev=> prev === slides.length-1 ? 0 : prev + 1), 3000)
        return ()=> clearInterval(intervaslId); 
    }, []);

  return (
    <div className='flex flex-col md:flex-row'>
      {/* text container */}
      <div className='flex-1 flex flex-col justify-center items-center p-6 text-red-500 gap-5 bg-red-100 '>
        <h1 className='text-5xl text-center text-bold p-4 uppercase md:text-7xl'>
          {slides[slideNo].title}
        </h1>
     
      </div>

      <div className='flex-1 md:w-1/2'>
        <Image
          src={slides[slideNo].image}
          alt='img'
          layout="responsive" width={400} height={400} objectFit="cover"
        />
      </div>
    </div>
  );
}
