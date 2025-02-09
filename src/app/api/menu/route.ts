import { createMenu } from "@/src/services/menu/createMenu";
import { getAllMenu } from "@/src/services/menu/getAllMenu";
import { getRestaurantById } from "@/src/services/resturant/getResturantById";
import { menuItemSchema } from "@/src/utils/validiation/menu/menuItemSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const menu = await getAllMenu();
    if (!menu) {
      return NextResponse.json({ error: "No Menu not found", status: 404 });
    }
    return NextResponse.json({
      message: "Menu Fetched Successfully",
      data: menu,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    menuItemSchema.parse(data);
    const restaurant = await getRestaurantById({ id: data.restaurant_id });
    if (!restaurant) {
      return NextResponse.json({
        message: "No Resturant not found By the Provided Id",
        status: 404,
        success: false,
      });
    }
    const menu = await createMenu({ data });
    return NextResponse.json({
      data: menu,
      success: true,
      message: "Menu Created Successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: error.issues,
        message: "Validation Error",
        success: false,
      });
    }
    return NextResponse.json({ error, status: 500 });
  }
}
