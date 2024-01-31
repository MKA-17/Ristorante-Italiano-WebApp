import Image from 'next/image'
import React from 'react'

export default function NotificationBar() {
  return (
    <div className='bg-red-500 text-white p-4 flex items-center justify-center cursor-pointer text-sm md:text-base gap-4'>
         Free dilivery!
        <div className='md:hidden flex flex-row bg-yellow-400 p-1 rounded text-white gap-1 '>
              <Image src="/phone.png" alt='img' width={20} height={20} />
              <span>111 222 333</span>
        </div>
    </div>
  )
}
