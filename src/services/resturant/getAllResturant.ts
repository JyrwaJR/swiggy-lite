import { prisma } from "@/prisma/client";

export const getAllResturant = async () => {
  try {
    return await prisma.restaurant.findMany({
      where: { isActive: true },
      include: {
        menuItems: true,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
