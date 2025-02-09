import { prisma } from "@/prisma/client";
type Props = {
  id: string;
};
export const getMenuItemsById = async ({ id }: Props) => {
  try {
    return await prisma.menuItems.findUnique({
      where: { id: id },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
