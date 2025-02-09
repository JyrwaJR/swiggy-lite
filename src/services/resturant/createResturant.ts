import { prisma } from "@/prisma/client";
import { RestaurantType } from "@/src/utils/validiation/resturant/resturantSchema";

type Props = {
  data: RestaurantType;
};

export const createRestaurant = async ({ data }: Props) => {
  try {
    return await prisma.restaurant.create({
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
        isActive: data.isActive,
        user: { connect: { id: data.user_id } },
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
