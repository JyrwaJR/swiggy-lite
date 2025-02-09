import { prisma } from "@/prisma/client";

export async function getUserByEmail(email: string) {
  try {
    return await prisma.authUser.findUnique({
      where: { email: email },
    });
  } catch (error) {
    throw error;
  }
}
