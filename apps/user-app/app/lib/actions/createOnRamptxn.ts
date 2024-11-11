"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
const token = (Math.random()*1000).toString();
  const userId = session.user.id;
  if (!userId) {
    return {
      error: "User not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider: provider,
      token: token
    }
  })
  return {
    message: "On ramp transaction added",
  };
}
