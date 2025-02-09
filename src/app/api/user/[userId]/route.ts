import { getUserById } from "@/src/services/user/getUserById";
import { updateUserById } from "@/src/services/user/updateUserById";
import { userSchema } from "@/src/utils/validiation/auth/userSchema";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ userId: string }> };
export async function GET(req: Request, { params }: Props) {
  try {
    const id = (await params).userId;
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        success: false,
        status: 404,
      });
    }
    return NextResponse.json({
      data: user,
      message: "User found",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500, message: "User not found" });
  }
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const id = (await params).userId;
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        success: false,
        status: 404,
      });
    }
    const update = await req.json();
    userSchema.pick({ phone_number: true }).parse(update);
    const updatedUser = await updateUserById({
      data: update,
      id: id,
    });
    return NextResponse.json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500, message: "User not found" });
  }
}
