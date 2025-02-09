import { getRestaurantById } from "@/src/services/resturant/getResturantById";
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
