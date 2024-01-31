import { prisma } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const PUT = async (req, { params: { token } }) => {
    try {

  const user = await prisma.user.findFirst({
    where: {
      activateTokens: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });
// console.log("activating user: ", user)
  if (!user)
    return NextResponse.json(
      { message: "User not found!", success: false },
      { status: 404 }
    );

    await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          active: true,
        },
      })
      await prisma.VerificationToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  return NextResponse.json(
    { message: "User email has been varified!", success: true },
    { status: 200 }
  );

    } catch (error) {
      return NextResponse.json(
        { message: "Server Error!", error },
        { status: 500 }
      );
    }
};
