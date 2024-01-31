import { prisma } from "@/utils/dbConnect"
import { NextResponse } from "next/server"
 
 
export const GET = async(req)=>{

    try{
      const {searchParams} = new URL(req.url);
      const category = searchParams.get("cat"); 
      // console.log(searchParams)
      const products = await prisma.product.findMany({
        where: {
          ...(category ? {categorySlug: category} : {isFeatured: true})
        }
      })
      // console.log("products: ", products)
      return  NextResponse.json({message: "Fetching products", products, searchParams: searchParams.get("cat")}, {status:200})

    }
    catch(error){
      return  NextResponse.json({message: "Server Error!", error, db: process.env.DATABASE_URL} , {status:500})

    }

}

export const POST = async(req)=>{

  try{
    const productData =  await req.json();
    console.log("products: ", productData)
    // productData.forEach(async e=>
      // await prisma.product.create({
      //     data: {
      //       ...e
      //     }
      //   })
      // )\\

    //main db part
    const newProduct = await prisma.product.create({
      data: {
        ...productData
      }
    })
    return  NextResponse.json({message: "Created the Product"}, {status:201})

  }
  catch(error){
    return  NextResponse.json({message: "Server Error!", error}, {status:500})

  }


}