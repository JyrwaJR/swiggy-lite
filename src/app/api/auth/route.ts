import { getErrorResponse } from "@/src/lib/helper/getErrorResponse";
import { signJWT, verifyJWT } from "@/src/lib/token";
import { getAuthById } from "@/src/services/auth/getAuthById";
import { getUserByEmail } from "@/src/services/user/getUserByEmail";
import { loginSchema } from "@/src/utils/validiation/auth/loginSchema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const header = req.headers.get("Authorization");
    if (!header) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const jwt = await verifyJWT<{ sub: string }>(header);
    const user = await getAuthById({ id: jwt.sub });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { success: true, message: "Login successful", data: user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    const user = await getUserByEmail(data.email);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (!user || !(await compare(data.password, user.password_hash))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const token = await signJWT({ sub: user.id });

    const response = NextResponse.json(
      { success: true, token },
      {
        status: 200,
      },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
        error,
      }),
    );
  }
}
