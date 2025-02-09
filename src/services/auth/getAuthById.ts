import { prisma } from "@/prisma/client";
type Props = {
  id: string;
};
export const getAuthById = ({ id }: Props) => {
  return prisma.user.findUnique({
    where: { auth_id: id },
  });
};
