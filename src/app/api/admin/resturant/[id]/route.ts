import { deleteRestaurantById } from "@/src/services/resturant/deleteResturantById";
import { getRestaurantById } from "@/src/services/resturant/getResturantById";
import { updateRestaurantById } from "@/src/services/resturant/updateRestaurantById";
import { getUserById } from "@/src/services/user/getUserById";
import { restaurantSchema } from "@/src/utils/validiation/resturant/resturantSchema";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ id: string }> };
export async function GET(req: Request, { params }: Props) {
  try {
    const id = (await params).id;
    const resturant = await getRestaurantById({ id });
    return NextResponse.json({ data: resturant, success: true, status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
    });
  }
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const id = (await params).id;
    const body = await req.json();
    restaurantSchema.parse(body);
    const resturant = await getRestaurantById({ id: id });
    if (!resturant) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Resturant not found",
      });
    }
    const updatedResturant = await updateRestaurantById({
      data: body,
      id: id,
    });
    return NextResponse.json({
      data: updatedResturant,
      success: true,
      status: 200,
      message: "Resturant Updated Successfully",
    });
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
    });
  }
}
export async function DELETE(req: Request, { params }: Props) {
  try {
    const id = (await params).id;
    const resturant = await getRestaurantById({ id: id });
    if (!resturant) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Resturant not found",
      });
    }
    const user = await getUserById(resturant.user_id);
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }
    const deletedResturant = await deleteRestaurantById({ id: id });
    return NextResponse.json({
      message: "Resturant deleted successfully",
      success: true,
      data: deletedResturant,
    });
  } catch (e) {
    return NextResponse.json({
      error: e,
      status: 500,
    });
  }
}
