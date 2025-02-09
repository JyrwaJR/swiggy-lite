import { UserType } from "@src/utils/validiation/auth/userSchema";
import { prisma } from "@/prisma/client";

type Props = {
  data: UserType;
  id: string;
};

export const updateUserById = async ({ data, id }: Props) => {
  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        phone_number: data.phone_number,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
