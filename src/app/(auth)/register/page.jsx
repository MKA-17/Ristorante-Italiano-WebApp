"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFileUploader } from "@/custom/useFileUploader";

export default function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: ""
  });
  const [respMsg, setRespMsg] = useState("");
  const [options, setOptions] = useState({ price: 0.0, title: "" });
  const { data: session, status } = useSession();
  const router = useRouter();
 
  useEffect(() => {
    // Handle initial unauthenticated state
    if (status === "authenticated") {
      return router.push("/");
    }

    
    
  }, [session, status]);

 

 
  useEffect(() => {
     
    // console.log("catData: ", getCategorysData?.categories)
  }, [ ]);

  const registerMutation = useMutation({
    mutationFn: async (variables) => {
      return (
        await fetch(`/api/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Setting the Content-Type header to JSON
          },
          body: JSON.stringify(variables),
          cache: "no-cache",
        })
      ).json();
    },
    onSuccess: (data, variables, context) => {
      console.log("Inside register mutation: ", data, variables);
      setRespMsg(()=>data.message);
    },
    onError: (error, variables, context) => {
      console.log("error: ", error.message);
      setRespMsg(()=>"Some Error has been occurred");
    },
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const {passwordConfirm, ...data} = registerFormData;
    console.log("Data: ", registerFormData);
     if (
      registerFormData.email &&
      registerFormData.name &&
      registerFormData.password
    )
    {
        if(registerFormData.passwordConfirm === registerFormData.password)
            registerMutation.mutate(data);
        else toast.error("The Passwords did'nt match!");
        
    }
    
    else toast.error("Fill the form completely to add the new product.");
    console.log("formdata: ", registerFormData)
  };
  return (
    <div className="container mx-auto m-4">
    <Toaster position="top-center" reverseOrder={true} />
    <form
      className="flex flex-col w-full p-4 gap-4 rounded-lg shadow-md ring-1 ring-red-500"
      action=""
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-semibold text-center mb-4">
        Register
      </h1>
  
      <div className="w-full flex flex-col gap-2 text-lg">
        <label htmlFor="email">Email</label>
        <input
          className="ring-1 ring-red-300 rounded"
          type="email"
          name="email"
          id="email"
          value={registerFormData.email}
          onChange={(e) =>
            setRegisterFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-lg">
        <label htmlFor="name">Name</label>
        <input
          className="ring-1 ring-red-300 rounded"
          type="text"
          name="name"
          id="name"
          value={registerFormData.name}
          onChange={(e) =>
            setRegisterFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-lg">
        <label htmlFor="password">Password</label>
        <input
          className="ring-1 ring-red-300 rounded"
          type="password"
          name="password"
          minLength="6"
          id="password"
          value={registerFormData.password}
          onChange={(e) =>
            setRegisterFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-lg">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          className="ring-1 ring-red-300 rounded"
          type="password"
          name="confirmPassword"
          minLength="6"
          id="confirmPassword"
          value={registerFormData.passwordConfirm}
          onChange={(e) =>
            setRegisterFormData((prev) => ({ ...prev, passwordConfirm: e.target.value }))
          }
        />
      </div>
  
      <button
        className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-md mt-4"
       >
        Register
      </button>
      <span>{respMsg && respMsg}</span>
      {registerMutation.isPending&&"Loading..."}
    </form>
  </div>
  
  );
}
