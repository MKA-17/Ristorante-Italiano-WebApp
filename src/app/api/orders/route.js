import { prisma } from "@/utils/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { getAuthSession } from "../auth/[...nextauth]/options";

export const GET = async(req)=>{

    try{
      
      const session = await getAuthSession();
    //   console.log(session)
    if(!session)
      return  NextResponse.json({message: "You are Unauthorized!"}, {status:401})

      const orders = session?.user?.isAdmin ? await prisma.order.findMany() : await prisma.order.findMany( {where: {userEmail: session?.user?.email}})
    
    return  NextResponse.json({message: "Fetching Orders", orders, session}, {status:200})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error}, {status:500})
  
    }
  
  }
  
  export const POST = async(req)=>{

    try{
      const session = await getAuthSession();
      if(!session)
        return  NextResponse.json({message: "You are Unauthorized!"}, {status:401})
      const orderData =  await req.json();
      console.log("order: ", orderData)
    //   orderData.forEach(async e=>
    //        await prisma.order.create({
    //       data: {
    //         ...e
    //       }
    //     })
    //     )
        let order = await prisma.order.create({
            data: {
              ...orderData
            }
          })
      return  NextResponse.json({message: "Created the Order", 
      order
    }, {status:201})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error}, {status:500})
  
    }
  
  }