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
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    // console.log("Categories:", data);

    return data;  
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

 
export default async function MenuPage() {
  let categoriesList = ( await fetchCategories())
  return (
    <div className='flex  flex-wrap justify-center items-center p-10 overflow-y-scroll'>
      {
        categoriesList.categories.map(e=>
          <MenuCard {...e} key={e.id}/>
          )
      }
      
    </div>
  )
}
