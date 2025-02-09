import { getAllUsers } from "@/src/services/user/getAllUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await getAllUsers();
    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }
    return NextResponse.json({ data: user });
  } catch (error) {
    console.log(error);
  }
}
