"use client";
import { useCartStore } from "@/store/CartStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  console.log(orderId)
  const {emptyCart} = useCartStore();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        let resp = await fetch(`/api/confirm/${orderId}`, {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
        if(resp.ok){
          let data = await resp.json();
          if(data.success === true)
            emptyCart()
        }
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [orderId, router]);

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
      <ConfettiExplosion className="absolute m-auto"
      />
      </div>
    </>
  );
};

export default SuccessPage;