import { getAuthSession } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
 
export const PUT = async(req, {params})=>{

    try{
    
      const session = await getAuthSession();
    //   console.log(session)
      if(!session)
          return  NextResponse.json({message: "You are Unauthorized!"}, {status:401})

      console.log("param.id: ", params.id,  )
      let order =  await prisma.order.findUnique({
        where: {
          id: params.id,
        },
      });
      // console.log("orders after id: ", order)
      if(!order)       return  NextResponse.json({message: "Order not found.", success: false    }, {status:404})

      let updatedOrder =  await prisma.order.update({
        where: {
          id: params.id,
        },
        data: { status: "Being prepared!" },
      });
      return  NextResponse.json({message: "Updated the Order Status!", 
      updatedOrder,
      success: true
    }, {status:200})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error, success: false}, {status:500})
  
    }
  
  }