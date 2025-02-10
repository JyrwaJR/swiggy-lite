import { createMenu } from "@/src/services/menu/createMenu";
import { getMenuItemsByRestaurantId } from "@/src/services/menu/getMenuByResturanId";
import { getRestaurantById } from "@/src/services/resturant/getResturantById";
import { menuItemSchema } from "@/src/utils/validiation/menu/menuItemSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type Props = { params: Promise<{ id: string }> };
export async function GET(req: Request, { params }: Props) {
  try {
    const header = req.headers.get("Authorization");
    if (!header) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = (await params).id;
    const isRestaurantExist = await getRestaurantById({ id });
    if (!isRestaurantExist) {
      return NextResponse.json({ error: "Restaurant not found", status: 404 });
    }
    const menu = await getMenuItemsByRestaurantId({ id });
    return NextResponse.json({
      data: menu,
      success: true,
      message: "Restaurant Menu fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    menuItemSchema.parse(data);
    const menu = await createMenu({ data });
    return NextResponse.json({
      data: menu,
      success: true,
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
