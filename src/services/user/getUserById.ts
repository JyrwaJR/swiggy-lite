import { prisma } from "@/prisma/client";

export async function getUserById(id: string) {
  try {
    console.log("getUserById", id);
    return await prisma.user.findUnique({
      where: { id: id },
    });
  } catch (error) {
    throw error;
  }
}
