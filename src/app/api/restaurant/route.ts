import { getAllResturant } from "@/src/services/resturant/getAllResturant";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const header = req.headers.get("Authorization");
    if (!header) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const resturants = await getAllResturant();
    return NextResponse.json({ data: resturants });
  } catch (error) {
    return NextResponse.json(
      { error, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
