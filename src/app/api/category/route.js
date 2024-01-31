import { prisma } from "@/utils/dbConnect"
import { NextResponse } from "next/server"
 
 


export const GET = async(req)=>{

  try{
    const categories = await prisma.category.findMany()
    return  NextResponse.json({message: "Fetching Category", categories}, {status:200})

  }
  catch(error){
    return  NextResponse.json({message: "Server Error!", error}, {status:500})

  }

}

export const POST = async(req)=>{

  try{
    const categoryData =  await req.json();
    // console.log("category: ", categoryData)
    const newCategory = await prisma.category.create({
      data: {
        ...categoryData
      }
    })
    return  NextResponse.json({message: "Created the Category", newCategory}, {status:201})

  }
  catch(error){
    return  NextResponse.json({message: "Server Error!", error}, {status:500})

  }

}