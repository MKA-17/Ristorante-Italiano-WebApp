"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFileUploader } from "@/custom/useFileUploader";

export default function AddMenuPage() {

  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
    colour: "black",
    image: "",
   });
  const { data: session, status } = useSession();
  const router = useRouter();
  const {uploadPercent, fileURL, setFile, file: imgFile} = useFileUploader();



  
  useEffect(() => {
    // Handle initial unauthenticated state
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
    
    // Check for admin status only when session data is available
    if (session && !session.user?.isAdmin) {
      router.push("/");
    }
  }, [session, status]);

  useEffect(() => {
    // if (imgFile)
    //  UploadFileToFirebase(imgFile, "image");
    console.log("uploading file info: ", [uploadPercent, fileURL])
  }, [uploadPercent, fileURL]);

 
  useEffect(()=>{
    if(fileURL)
      setCategoryData(prev=>({
      ...prev, image: fileURL}))
    // console.log("catData: ", getCategorysData?.categories)
  }, [fileURL])
  
  const addCategoryMutation =  useMutation({
    mutationFn: async (variables) => {
      
      return (
        await fetch(`/api/category`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' // Setting the Content-Type header to JSON
          },
          body: JSON.stringify(variables),
          cache: "no-cache"
        })
        ).json();
      },
      onSuccess: (data, variables, context) => {
        console.log("Inside Add category mutation: ", data, variables);
        toast.success(data.message)
        
      },
      onError: (error, variables, context) => {
        console.log("error: ", error.message);
        toast.error('Some Error has been occurred') 
      },
    });

 
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        ...categoryData,
        slug: categoryData.title.split(" ").join("-")    
        }
      console.log("Data: ", data);
      console.log("image: ", imgFile);
      if(categoryData.title && categoryData.description && categoryData.colour && categoryData.image  )
      addCategoryMutation.mutate(data);
    else 
      toast.error("Fill the form completely to add the new product.")
      
    };
    return (
      <div className="container mx-auto   m-4">
         <Toaster
        position="top-center"
        reverseOrder={true}
        />
      <form
        className="flex flex-col w-full p-4 gap-4 rounded-lg shadow-md ring-1 ring-red-500"
        action=""
        >
        <h1 className="text-2xl font-semibold text-center mb-4">
          Add New Category In the Menu
        </h1>

        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Title</label>
          <input
            className="ring-1 ring-red-300 rounded"
            type="text"
            name="title"
            id=""
            value={categoryData.title}
            onChange={(e)=>setCategoryData(prev=>({...prev, title: e.target.value}))}
          
          />
        </div>

        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Colour</label>
          <input
            className="ring-1 ring-red-300 rounded"
            type="text"
            name="title"
            id=""
            value={categoryData.colour}
            onChange={(e)=>setCategoryData(prev=>({...prev, colour: e.target.value}))}
          
          />
        </div>
        
        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Description</label>
          <textarea
            className="ring-1 ring-red-300 rounded"
            type="text"
            name="description"
            id=""
            value={categoryData.description}
            onChange={(e)=>setCategoryData(prev=>({...prev, description: e.target.value}))}
          
          />
        </div>
  
     
          
        <div className="w-full flex flex-col gap-2 text-lg">
          <label htmlFor="">Image</label>
          <input
            className="ring-1 ring-red-300 rounded"
            type="file"
            name="image"
            id=""
            onChange={e=>setFile(()=>e.target.files[0])}
          />
          {
          imgFile && 
        <Image
        src={URL.createObjectURL(imgFile)}
        width={200}
        height={200}
        alt="img"
        />
        
        
        }
        {
            !!uploadPercent && <span>Uploading Status: {uploadPercent}</span> 

        }

        </div>
     
        <button className="w-full px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-md mt-4"
        onClick={handleSubmit}
        >
          Add Category
        </button>
        
      </form>
    </div>
  );
}
