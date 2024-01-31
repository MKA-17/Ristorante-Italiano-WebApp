"use client"

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react'
 
export default function ActivateUser({params: {token}}) {
    const [message, setMessage] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Handle initial unauthenticated state
        if (status === "authenticated") {
          return router.push("/");
        }
    
        
        
      }, [session, status]);

    const activateMutation = useMutation({
        mutationFn: async (variables) => {
          return (
            await fetch(`/api/user/activate/${token}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json", // Setting the Content-Type header to JSON
              },
              cache: "no-cache",
            })
          ).json();
        },
        onSuccess: (data, variables, context) => {
          console.log("Inside user activation mutation: ", data, variables);
          setMessage(data.message);
          if(data.success) router.push("/login")
        },
        onError: (error, variables, context) => {
          console.log("error: ", error.message);
          toast.error("Some Error has been occurred");
        },
      });
  return (
    <div className='flex flex-col'>
    <span className='flex text-red-500'>Verify The Button To Your Acoount</span>
    <div className=' flex  flex-row p-3'>
    <button
    className=" px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-md mt-4"
    onClick={()=>activateMutation.mutate()}
   >
    Verify 
  </button>  
    {
        !!message &&
            <span className='flex text-red-500'>{message}</span>
    }

    </div>
    </div>
  )
}
