import { prisma } from "@/prisma/client";

export async function getUserByPhone(phone_number: string) {
  try {
    return await prisma.user.findFirst({
      where: { phone_number: phone_number },
    });
  } catch (error) {
    throw error;
  }
}
