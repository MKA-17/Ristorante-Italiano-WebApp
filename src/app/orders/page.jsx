"use client";

import React, { useEffect } from "react";
import { getAuthSession } from "../api/auth/[...nextauth]/options";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StatusButton from "@/components/Orders/StatusButton";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  
  const router = useRouter();

  if (status === "unauthenticated") router.push("/");

  let {
    data: getOrdersData,
    isLoading: ordersIsLoading,
    isError: ordersIsError,
    refetch: getOrdersRefetch,
  } = useQuery({
    queryKey: ["ordersData"],
    queryFn: async () => {
      let resp = await fetch(`/api/orders`, {
        method: "GET",
        cache: "no-store",
      });

      return resp.json();
    },
  });
  useEffect(() => {
    console.log("orders: ", getOrdersData?.orders);
  }, [getOrdersData]);

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      {/* <h1 className="text-2xl font-bold mb-4 ">Food Delivery Orders</h1> */}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          {/* Table Headings */}
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b   md:table-cell">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b   md:table-cell">Items</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Replace the following with your actual data */}
            {getOrdersData?.orders &&
              getOrdersData.orders?.map((e) => (
                <tr key={e.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {e.intentId}
                  </td>
                  {e.status.toLowerCase() === "delivered" ? (
                    <td className="py-2 px-4 border-b text-center bg-red-400  text-white md:table-cell">
                      {e.status}
                    </td>
                  ) : session?.user?.isAdmin ? (
                    <td className="py-2 px-4 border-b text-center  md:table-cell">
                      <StatusButton
                        prevStatus={e.status}
                        orderId={e.id}
                        getOrdersRefetch={getOrdersRefetch}
                      />
                    </td>
                  ) : (
                    <td className="py-2 px-4 border-b text-center   md:table-cell">
                      {e.status}
                    </td>
                  )}
                  <td className="py-2 px-4 border-b text-center">
                    {e.createdAt}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{e.price}</td>
                  <td className="py-2 px-4 border-b text-center   md:table-cell">
                    {e.products
                      .map((el) => `${el.title}(${el.quantity})`)
                      .join(" ")}
                  </td>
                </tr>
              ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      {ordersIsLoading && "Loading..."}
      {ordersIsError && "Server Error!"}
    </div>
  );
}
