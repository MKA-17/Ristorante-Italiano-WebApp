import Link from 'next/link'
import React from 'react'

export default function MenuCard({title = "title", description = "description", colour = "green-400", image: bgImage = "/temporary/m1.png", slug}) {
  return (
    // <div className={``} >
        <Link 
         href={`/menu/${slug}`}
         className={'max-w-sm  rounded  shadow-lg m-1  w-full h-max-xl object-cover object-center p-3'}
         style={{backgroundImage: `url(${bgImage})`}}
          >
            <div className='px-6 py-4'>

            <h1 className='text-4xl uppercase'>
                {title}
            </h1>
            <p className='text-gray-700 text-base'>
                {description}
               
            </p>
            </div>

        </Link>
        

    // </div>
  )
}

