"use client"

import useCartStoreHydrated from "@/custom/useCartStoreHydrated";
import { useCartStore } from "@/store/CartStore";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const CartPage = () => {
  const {cart, addItemToCart, removeCartItems} = useCartStoreHydrated();
  const { data: session, status } = useSession();
  const router = useRouter();

  if(status === "unauthenticated"){
    router.push("/")
  }

  const orderMutation = useMutation({
    mutationFn: async (variables) => {
      return (
        await fetch(`api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variables),
        })
      ).json();
    },
    onSuccess: (data, variables, context) => {
      console.log("Inside Order Post mutation: ", data, variables);
      toast.success(data.message);
      if(data?.order?.id)
        router.push(`/payment/${data?.order?.id}`)
    },
    onError: (error, variables, context) => {
      console.log("error: ", error.message);
 

      toast.error('Some Error has been occurred')
    },
  });

  const handleCheckout = ()=>{
    if(!cart.products?.length) return toast("No order has been placed yet")
    const order = {
      userEmail: session?.user?.email,
      price: cart.totalPrice,
      products: cart.products,
      status: "Not paid",
       }
      console.log("orderData: ", order);

    orderMutation.mutate(order)
     //try inside orderMutation
  }

  useEffect(()=>{
        
    console.log("products in cart " )
}, [])



 
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
       <Toaster
        position="top-center"
        reverseOrder={true}
        />
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {
          cart?.products ?  
            cart.products.map((e, i)=>
            <div className="flex items-center justify-between mb-4" key={i}>
              <Image src={e.image} alt="" width={100} height={100} />
              <div className="">
                <h1 className="uppercase text-xl font-bold">{e.title}</h1>
                <span>{e.option} Quantity: {e.quantity}</span>
                
              </div>
              <h2 className="font-bold">${e.price}</h2>
              <span className="cursor-pointer"
              onClick={()=>removeCartItems(e)}
              >X</span>
            </div>
              )
            :
            "No orders!"
        }
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal {cart?.totalItems? cart.totalItems : 0} items</span>
          <span className="">${cart?.totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${cart?.totalPrice}</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end" 
        onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;

