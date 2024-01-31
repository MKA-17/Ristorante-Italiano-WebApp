import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/options";

export const PUT = async(req, {params})=>{

    try{
    
      const session = await getAuthSession();
    //   console.log(session)
      if(!session?.user?.isAdmin)
          return  NextResponse.json({message: "You are Unauthorized!"}, {status:401})

      const body =  await req.json();
      console.log("param: ", params.id, {...body})
      let updatedOrder =  await prisma.order.update({
        where: {
            id: params.id
        },
        data:{
            ...body
        }
      })
      return  NextResponse.json({message: "Updated the Order Status!", 
      updatedOrder
    }, {status:200})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error}, {status:500})
  
    }
  
  }