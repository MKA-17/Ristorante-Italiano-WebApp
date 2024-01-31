import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";  



export const POST = async (req) => {
  // try {
    const userData = await req.json();
    console.log("userData: ", userData)
    if(!userData.email && !userData.password)
            return NextResponse.json(
              { message: "email or password not provided!", success: false, },
              { status: 400 }
            );;
          const user = await prisma.user.findUnique({
            where:{
              email: userData.email
            },
          });
          
          // console.log("userData inside authorize: ", user)

          if (!user) {
            console.log("user not found")

            return NextResponse.json(
              { message: "User not found!", success: false  },
              { status: 404 }
            );
            // Any object returned will be saved in `user` property of the JWT
           }  

           if(!user.active){
            console.log("user email not verified")
            return NextResponse.json(
              { message: "User account not verified. Verify your account via the mail we sent you on your email.", success: false, },
              { status: 401 }
            ); //or redirect to some page
           }

           if(!user.password){
            console.log("user has already logged in with the account via google sign in")
            return NextResponse.json(
              { message: "User has already logged in with this account via google sign in.", success: false, },
              { status: 200 }
            ); //or redirect to some page
           }

           const isPassword = await bcrypt.compare(userData.password || "", user.password);
           if(!isPassword)
            return NextResponse.json(
              { message: "Incorrect Password!", success: false, },
              { status: 401 }
            );

            const {password, ...userDetails} = user;
           return NextResponse.json(
            { message: "Logging user in!", user: userDetails, success: true },
            { status: 200 }
          );
        
  // } catch (error) {
  //   return NextResponse.json(
  //     { message: "Server Error!", error, success: false },
  //     { status: 500 }
  //   );
  // }
};
