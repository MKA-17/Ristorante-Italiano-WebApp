"use client";

import useCartStoreHydrated from "@/custom/useCartStoreHydrated";
import { useSession } from "next-auth/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddCartButton({
  productDetails,
  option,
  quantity,
  price,
}) {
  const { cart, addItemToCart, removeCartItems } = useCartStoreHydrated();
  const { data: session, status } = useSession();

  const handleAddCart = () => {
    if (status === "authenticated") {
      console.log("addtocart: ", {option,
        quantity: quantity,
        price: quantity ? eval((quantity * price).toFixed(2)) : price})
      addItemToCart({
        ...productDetails,
        option,
        quantity: quantity,
        price: quantity ? eval((quantity * price).toFixed(2)) : price,
      });
      toast.success("Added to the Cart!");
    } else toast("Login first!");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />{" "}
      <button
        className="p-2 bg-red-500 text-center text-white   px-5 hover:bg-red-600 hover:text-white left-0"
        onClick={handleAddCart}
      >
        Add To Cart
      </button>
    </>
  );
}
