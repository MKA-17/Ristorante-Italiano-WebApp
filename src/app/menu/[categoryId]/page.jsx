import { getAuthSession } from "@/app/api/auth/[...nextauth]/options";
import ItemCard from "@/components/Home/ItemCard";
import DeleteCategoryButton from "@/components/Menu/DeleteCategoryButton";
import React from "react";


export async function generateMetadata( { params, searchParams }  )  {
  
   
 
  return {
    
      title: `${params.categoryId}`,
      description: `Menu ${params.categoryId} category`,
    
  }
}
const fetchProducts = async (cat) => {
  try {
    const response = await fetch(`${process.env.Domain_Name}/api/product?cat=${cat}`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();


    return data; 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};


export default async function CategoryPage({ params }) {
  const productsList = await fetchProducts(params.categoryId);
  const session =  await getAuthSession();
  console.log("auth: ")

  return (
    !!productsList?.products &&
    <>
      {!!session?.user?.isAdmin && <DeleteCategoryButton categoryId={params.categoryId} />}
    <div className="flex  flex-wrap md:justify-center items-center md:p-5 ">

      {
          productsList.products.map(e=>
            <ItemCard key={e.id} {...e}/>
            )
        }
    </div>
    </>  
  );
}
