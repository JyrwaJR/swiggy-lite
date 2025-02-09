import { prisma } from "@/prisma/client";
import { MenuItemType } from "@/src/utils/validiation/menu/menuItemSchema";

type Props = {
  data: MenuItemType;
};

export const createMenu = async ({ data }: Props) => {
  try {
    return await prisma.menuItems.create({
      data: data,
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
