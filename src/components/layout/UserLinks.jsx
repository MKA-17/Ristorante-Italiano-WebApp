"use client"

import useCartStoreHydrated from '@/custom/useCartStoreHydrated';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export default function UserLinks() {
    const { data: session, status } = useSession();
    const {cart} = useCartStoreHydrated();


    return (
        <>
            {
                status === "authenticated" ?
                    <>
                        <Link href={"/orders"}  >Orders</Link>
                        {
                            !!session?.user?.isAdmin &&    
                                <>
                                    <Link href={"/product/create"} >Add Product</Link>
                                    <Link href={"/menu/create"} >Add Category</Link>
                                </>
                        }
                        <Link href={"/cart"} >Cart ({cart.totalItems})</Link>
                        {/* <Link href={"/"} >Logout</Link> */}
                        <button onClick={()=>{
                            window.localStorage.removeItem("cart")
                            signOut()
                            }}>Logout</button>
                    </> 
                :
                    <Link href={"/login"} >Login</Link>


        }
    </>
  )
}
