import { prisma } from "@/prisma/client";
import { ResturantType } from "@utils/validiation/resturant/resturantSchema";

type Props = {
  data: ResturantType;
  id: string;
};

export const updateRestaurantById = async ({ data, id }: Props) => {
  try {
    return await prisma.restaurant.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        phoneNumber: data.phoneNumber,
        logoUrl: data.logoUrl,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
