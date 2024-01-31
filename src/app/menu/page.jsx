import MenuCard from '@/components/Menu/MenuCard'
import React from 'react'

export const metadata = {
  title: 'Menu',
  description: 'Menu page',
}

const fetchCategories = async () => {
  try {
    const response = await fetch(`${process.env.Domain_Name}/api/category`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      return "Failed to fetch categories";
    }

    const data = await response.json();

    // console.log("Categories:", data);

    return data;  
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return error;
  }
};

 
export default async function MenuPage() {
  let categoriesList = ( await fetchCategories())
  return (
    <div className='flex  flex-wrap justify-center items-center p-10 overflow-y-scroll'>
      {
        categoriesList?.categories ?

        categoriesList.categories?.map(e=>
          <MenuCard {...e} key={e.id}/>
          )
          :
          categoriesList
      }
      
    </div>
  )
}
