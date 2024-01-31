import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col md:flex-row h-15 md:h-24 border-t-4  border-t-red-500 text-red-500 p-4 gap-8 justify-between '>
      <Link href="/" className='text-xl font-bold'>Ristorante Italiano</Link>
      <p>All rights reserved. © 2024 Ristorante italiano</p>
    </div>
  )
}
