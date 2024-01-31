import { getAuthSession } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req, { params }) => {
  try {
    const session = await getAuthSession();
      console.log("post method is called! in create intent route")
    if (!session)
      return NextResponse.json(
        { message: "You are Unauthorized!" },
        { status: 401 }
      );

     console.log("orderId: ", params.id );
    let order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!order)
    return NextResponse.json(
        { message: "Order not found", error },
        { status: 404 }
      );

      const paymentIntent = await stripe.paymentIntents.create({
        amount: order.price * 100,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      console.log("paymentIntent: ", paymentIntent.id);
      
      let updatedOrder = await prisma.order.update({
        where: {
          id: params.id,
        },
        data: {
          intentId: paymentIntent.id,
        },
      });
      
      // console.log("updatedorder found: ", updatedOrder)
      console.log("secret client found: ", paymentIntent.client_secret)
      return NextResponse.json(
        { message: "Order payment!", clientSecret: paymentIntent.client_secret,
        updatedOrder
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error!", error },
      { status: 500 }
    );
  }
};
