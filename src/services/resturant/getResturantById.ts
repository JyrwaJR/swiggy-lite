import { prisma } from "@/prisma/client";
type Props = {
  id: string;
};

export const getRestaurantById = async ({ id }: Props) => {
  try {
    return await prisma.restaurant.findUnique({
      where: { id: id, isActive: true },
      include: { menuItems: true },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
