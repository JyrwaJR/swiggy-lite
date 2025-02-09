import { prisma } from "@/prisma/client";
import { MenuItemType } from "@/src/utils/validiation/menu/menuItemSchema";

type Props = {
  data: MenuItemType;
  id: string;
};

export const updateMenuById = async ({ data, id }: Props) => {
  try {
    return await prisma.menuItems.update({
      where: { id: id },
      data: data,
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
