"use client";

import CheckoutForm from "@/components/Orders/CheckoutForm";
 import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PayPage = ({ params } ) => {
  const [clientSecret, setClientSecret] = useState("");

  const { orderId: id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `/api/create-intent/${id}`,
          {
            method: "POST",
            cache: "no-cache"
          }
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
        console.log("data of makeRequest: ", data)
      } catch (err) {
        console.log(err);
      }
    };

    if (!clientSecret && id) {
      makeRequest();
    }

  }, [id]);
  useEffect(()=>{
console.log("client secret: ", clientSecret)
  }, [clientSecret])

  const options ={
    clientSecret,
    appearance:{
      theme:"stripe"
    }
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={id}/>
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
