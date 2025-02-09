import { prisma } from "@/prisma/client";

export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      include: { resturant: true },
    });
  } catch (error) {
    throw error;
  }
}
