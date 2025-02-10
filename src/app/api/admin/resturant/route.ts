import { getAllResturant } from "@/src/services/resturant/getAllResturant";
import { restaurantSchema } from "@utils/validiation/resturant/resturantSchema";
import { createRestaurant } from "@/src/services/resturant/createResturant";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getUserById } from "@/src/services/user/getUserById";
import { getRestaurantByUserId } from "@/src/services/resturant/getRestaurantByUserId";

export async function GET() {
  try {
    const resturants = await getAllResturant();
    return NextResponse.json({ data: resturants });
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    restaurantSchema.parse(body);
    const user = await getUserById(body.user_id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    const isResturantExistUnderUserId = await getRestaurantByUserId({
      id: body.user_id,
    });
    if (isResturantExistUnderUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "Resturant already exist under this user id",
          data: isResturantExistUnderUserId,
        },
        { status: 400 },
      );
    }
    const resturant = await createRestaurant({ data: body });
    return NextResponse.json(
      {
        message: "Resturant created successfully",
        success: true,
        data: resturant,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
          message: "Validation Error",
          success: false,
        },
        { status: 400 },
      );
    }
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}
