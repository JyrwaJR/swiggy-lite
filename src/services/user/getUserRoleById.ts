import { prisma } from "@/prisma/client";

export async function getUserRoleById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: id },
      select: { role: true },
    });
  } catch (error) {
    throw error;
  }
}
