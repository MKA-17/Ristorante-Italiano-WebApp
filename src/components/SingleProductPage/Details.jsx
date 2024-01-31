"use client";

import React, { useEffect, useState } from "react";
import AddCartButton from "../CommonComponents/AddCartButton";

export default function Details({ price, options, ...productDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [sizeOfItem, setSizeOfItem] = useState(options[0]);
  // const [slideNo, setSlideNo] = useState(0);
  // useEffect(()=>{
        
  //     // console.log("remaing: ", cart, productDetails  )
  // }, [cart.totalItems])

  
  return (
    <>
      <span className="text-red-500">
        ${eval(quantity? eval((quantity * price).toFixed(2)) : price)}
      </span>
      <div className="flex-1 flex gap-2">
        {options?.map((e, i) => (
          <button
            key={i}
            className={`p-2 bg-${
              sizeOfItem.title === e?.title ? "red-500" : "white"
            } text-center text-${
              sizeOfItem.title === e.title ? "white" : "red-500"
            } border-2 border-red-500 rounded px-5 hover:bg-red-600 hover:text-white left-0`}
            onClick={() => setSizeOfItem(() => e)}
          >
            {e.title || e} ${e.price}
          </button>
        ))}

     

      </div>
      <div className="flex-1 flex">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        
        <AddCartButton productDetails={productDetails} option={setSizeOfItem} quantity={quantity} price={price}/>
      
 
      </div>
    </>
  );
}
