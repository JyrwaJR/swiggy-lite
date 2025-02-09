import { prisma } from "@/prisma/client";

type Props = {
  id: string;
};

export const getRestaurantByUserId = async ({ id }: Props) => {
  try {
    return await prisma.restaurant.findFirst({
      where: { user_id: id },
    });
  } catch (error) {
    throw error; // Re-throw the error for proper handling
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
  }
};
