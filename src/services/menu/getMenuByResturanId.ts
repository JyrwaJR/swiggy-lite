import { prisma } from "@/prisma/client";

type Props = {
  id: string;
};

export const getMenuItemsByRestaurantId = async ({ id }: Props) => {
  try {
    return await prisma.menuItems.findMany({
      where: { restaurant_id: id },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
