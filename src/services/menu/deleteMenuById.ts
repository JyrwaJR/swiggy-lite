import { prisma } from "@/prisma/client";

type Props = {
  id: string;
};
export async function deleteMenuById({ id }: Props) {
  try {
    return await prisma.menuItems.delete({
      where: { id: id },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
