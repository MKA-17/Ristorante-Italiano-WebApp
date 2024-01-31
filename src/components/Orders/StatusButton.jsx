"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function StatusButton({prevStatus, orderId, getOrdersRefetch}) {
    const [status, setStatus] = useState(prevStatus);

    const statusMutation =  useMutation({
        mutationFn: async (variables) => {
          
          return (
            await fetch(`/api/orders/${orderId}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json' // Setting the Content-Type header to JSON
              },
              body: JSON.stringify(variables),
              cache: "no-cache"
            })
          ).json();
        },
        onSuccess: (data, variables, context) => {
          console.log("Inside Status mutation: ", data, variables);
          getOrdersRefetch();
          toast.success(data.message)
            
         },
        onError: (error, variables, context) => {
          console.log("error: ", error.message);
          toast.error('Some Error has been occurred') 
        },
      });   

    const handleStatus = ()=>{
        if(status.trim()) statusMutation.mutate({status})
        console.log("status: ", status, orderId)
    }
  return (
    <div className="flex flex-row gap-1 justify-center items-center">
        <Toaster
        position="top-center"
        reverseOrder={true}
        />
      <input
        type="text"
        value={status}
        className="ring-2 w-32 ring-red-500"
        onChange={(e) => setStatus(()=>e.target.value)}
      />
      <button className="p-2 bg-red-500 text-center text-white rounded-full hover:bg-red-600 hover:text-white left-0"
      onClick={handleStatus}
      >
        Edit
      </button>
    </div>
  );
}
