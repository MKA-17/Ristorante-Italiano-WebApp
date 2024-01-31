import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/options";

export const GET = async(req, {params})=>{

    try{
    
      // console.log("param: ", params.id)
      let product =  await prisma.product.findUnique({
        where: {
            id: params.id
        } 
      })
      return  NextResponse.json({message: "Fetching the Product!", 
      product
    }, {status:200})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error}, {status:500})
  
    }
  
  }

  export const DELETE = async(req, {params})=>{

    try{
      const session = await getAuthSession();
    //   console.log(session)
      if(!session?.user?.isAdmin)
          return  NextResponse.json({message: "You are Unauthorized!"}, {status:401})
      console.log("param: ", params.id)
      let product =  await prisma.product.delete({
        where: {
            id: params.id
        } 
      })
      return  NextResponse.json({message: "Deleted the Product!", params
    }, {status:200})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error}, {status:500})
  
    }
  
  }

