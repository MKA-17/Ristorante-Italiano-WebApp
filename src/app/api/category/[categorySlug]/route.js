import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/options";

export const DELETE = async(req, {params})=>{

    try{
      const session = await getAuthSession();
    //   console.log(session)
      if(!session?.user?.isAdmin)
          return  NextResponse.json({message: "You are Unauthorized!"}, {status:401})
      console.log("param: ", params.categorySlug)
      let category =  await prisma.category.delete({
        where: {
            slug: params.categorySlug
        } 
      })
      return  NextResponse.json({message: "Deleted the Category!", category
    }, {status:200})
  
    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error}, {status:500})
  
    }
  
  }

