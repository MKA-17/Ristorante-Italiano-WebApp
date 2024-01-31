import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddCartButton from "../CommonComponents/AddCartButton";

export default function ItemCard({title, description, colour, image, price, id: productId, options, ...remainingDetails}) {
  // console.log("remaining details: ", remainingDetails)
  return (
      <div className="w-screen h-[60hv] flex flex-col items-center justify-around p-4 hover:bg-red-200 md:w-[33vw]"
       >
        <Link href={`/product/${productId}`} className="  flex-1  hover:rotate-3 transition-all duration-500 ">
          <Image
            src={image}
            alt="img"
            width={200}
            height={200}
             className="object-contain "
          />
        </Link>
        {/* text container */}
        <div className="flex-1 gap-7">
          <h2 className="text-xl text-red-500 font-bold uppercase text-center">{title}</h2>
          <p className="text-red-500">
            {description}
          </p>
          <p className="text-xl text-red-500 font-bold uppercase">${price}</p>
          <AddCartButton productDetails={{title, description, colour, image, id: productId, ...remainingDetails}} option={options[0]?.title?options[0]?.title:options[0]} quantity={1} price={price}/>
        </div>
      </div>
  );
}
