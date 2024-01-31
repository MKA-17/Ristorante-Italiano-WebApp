import React from "react";
import ItemCard from "./ItemCard";


const fetchProducts = async () => {
  try {
    const response = await fetch(`${process.env.Domain_Name}/api/product`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      return  "Failed to fetch products";
    }

    const data = await response.json();


    return data; 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};


export default async function FeaturedItems() {
  const productsList = await fetchProducts();
  // console.log("products:", productsList);

  return (
    <div className="flex flex-row w-screen  overflow-x-scroll ">
      <div className="w-max flex">
        {
          productsList?.products ?
          productsList.products.map(e=>
            <ItemCard key={e.id} {...e}/>
            )
            :
            (productsList)
        }
         
      </div>
    </div>
  );
}
