import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import  nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,//generate appPassword from the gmail account
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const POST = async (req) => {
  try {
    const userData = await req.json();
    console.log("user: ", userData);
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (user){
      if(user.active)
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 200 }
      );
      else{
        const varifyToken = await prisma.VerificationToken.create ({
          data:{
          token: uuidv4(),//    String   @unique
          userId: user.id,//       String @db.ObjectId
          activatedAt: null
        }
        });
    
        const info = await transporter.sendMail({
          from: '"Ristorante Italiano" <khizaraslam17@gmail.com>', // sender address
          to: userData.email, // list of receivers
          subject: "Email verification for Ristorante Italiano.", // Subject line
           html: `<h3>Verify your account for <b>Ristorante Italiano</b> <a href='${process.env.Domain_Name}/activate/${varifyToken.token}'>Click Here!</a></h3>`
        });
        return NextResponse.json(
          { message: "User Already Exists, verify your account via the email we sent on your provided email account." },
          { status: 200 }
        );
      }
    }

    let hashedPassword = await bcrypt.hash(userData.password, 10);

    //main db part
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const varifyToken = await prisma.VerificationToken.create ({
      data:{
      token: uuidv4(),//    String   @unique
      userId: newUser.id,//       String @db.ObjectId
      activatedAt: null
    }
    });

    const info = await transporter.sendMail({
      from: '"Ristorante Italiano" <khizaraslam17@gmail.com>', // sender address
      to: userData.email, // list of receivers
      subject: "Email verification for Ristorante Italiano.", // Subject line
       html: `<h3>Verify your account for <b>Ristorante Italiano</b> <a href='${process.env.Domain_Name}/activate/${varifyToken.token}'>Click Here!</a></h3>`
    });
    // console.log("nodemailer: ", info)
 

    const { password, ...userDetails } = newUser;
    return NextResponse.json(
      { message: "Created the User. Verify your account via the mail we sent!", user: userDetails },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error!", error, },
      { status: 500 }
    );
  }
};
