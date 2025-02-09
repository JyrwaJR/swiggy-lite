import { prisma } from "@/prisma/client";

export const getAllMenu = async () => {
  try {
    return await prisma.menuItems.findMany();
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
