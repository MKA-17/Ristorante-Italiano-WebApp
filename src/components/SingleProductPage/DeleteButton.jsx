"use client"

import useCartStoreHydrated from '@/custom/useCartStoreHydrated';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image'
import React from 'react'
import toast, { Toaster } from "react-hot-toast";


export default function DeleteButton({productId}) {
    const {removeCartItems} = useCartStoreHydrated()
    const deleteProductMutation =  useMutation({
        mutationFn: async (variables) => {
          
          return (
            await fetch(`/api/product/${productId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json' // Setting the Content-Type header to JSON
              },
               cache: "no-cache"
            })
          ).json();
        },
        onSuccess: (data, variables, context) => {
          console.log("Inside Delete product mutation: ", data, variables);
          
          toast.success(data.message)
            
         },
        onError: (error, variables, context) => {
          console.log("error: ", error.message);
          toast.error('Some Error has been occurred') 
        },
      });   

      const handleDelete = ()=>{
        const shouldDelete = window.confirm('Are you sure you want to delete this product?');

    if (shouldDelete) {
      // Perform the deletion
      deleteProductMutation.mutate()
    } else {
       
    }
      }

  return (
    <div className="relative">
        <Toaster
        position="top-center"
        reverseOrder={true}
        />
    {/* Your component content */}
    <button
      className="flex bg-red-400 hover:bg-red-500 text-white p-2 rounded-full absolute top-0 right-0 m-4"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </button>
  </div>
  
  )
}
