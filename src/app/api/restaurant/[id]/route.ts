import { getRestaurantById } from "@/src/services/resturant/getResturantById";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ id: string }> };
export async function GET(req: Request, { params }: Props) {
  try {
    const header = req.headers.get("Authorization");
    if (!header) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
