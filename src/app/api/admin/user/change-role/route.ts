import { restaurantSchema } from "@utils/validiation/resturant/resturantSchema";
import { createRestaurant } from "@/src/services/resturant/createResturant";
import {
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getUserById } from "@/src/services/user/getUserById";
import { getRestaurantByUserId } from "@/src/services/resturant/getRestaurantByUserId";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const data = restaurantSchema.safeParse(body);
    if (!data.success) {
      return NextResponse.json({
        error: data.error.issues,
        status: 400,
        message: "Validation Error",
      });
    }
    const user = await getUserById(body.user_id);
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    const isResturantExistUnderUserId = await getRestaurantByUserId({
      id: body.user_id,
    });
    if (isResturantExistUnderUserId) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Resturant already exist under this user id",
        data: isResturantExistUnderUserId,
      });
    }
    const resturant = await createRestaurant({ data: body });
    return NextResponse.json({
      message: "Resturant created successfully",
      success: true,
      data: resturant,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: error.issues,
        message: "Validation Error",
        success: false,
      });
    }
    if (error instanceof PrismaClientInitializationError) {
      return NextResponse.json({ error, status: 500, success: false });
    }
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json({ error, status: 500, succcess: false });
    }
    return NextResponse.json({ error, status: 500, success: false });
  }
}
