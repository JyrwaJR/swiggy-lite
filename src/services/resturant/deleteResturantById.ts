import { prisma } from "@/prisma/client";

type Props = {
  id: string;
};

export const deleteRestaurantById = async ({ id }: Props) => {
  try {
    return await prisma.$transaction([
      prisma.menuItems.deleteMany({
        where: {
          restaurant_id: id,
        },
      }),
      prisma.restaurant.delete({
        where: {
          id: id,
        },
      }),
    ]);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
