import { prisma } from "@/prisma/client";
import { RegistrationType } from "@/src/utils/validiation/auth/registerSchema";
import { hashPassword } from "@/src/lib/auth/hashPassword";

type Props = {
  data: RegistrationType;
};

export const createUser = async ({ data }: Props) => {
  const hashPass = await hashPassword(data.password);
  return await prisma.authUser.create({
    omit: { password_hash: true },
    include: { user: true },
    data: {
      email: data.email,
      user_name: data.user_name,
      password_hash: hashPass,
      user: {
        create: {
          phone_number: data.phone_number,
          isActive: true,
          role: "Customer",
        },
      },
    },
  });
};
