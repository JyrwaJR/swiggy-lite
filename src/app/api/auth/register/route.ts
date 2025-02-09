import { getUserByEmail } from "@/src/services/user/getUserByEmail";
import { getUserByPhone } from "@/src/services/user/getUserByPhone";
import { registerSchema } from "@/src/utils/validiation/auth/registerSchema";
import { createUser } from "@src/services/user/createUser";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    registerSchema.parse(reqBody);
    const isUserExist = await getUserByEmail(reqBody.email);
    console.log("Log 1");
    if (isUserExist) {
      return NextResponse.json(
        {
          message: "User already exist By this email",
          user: isUserExist,
        },
        { status: 400 },
      );
    }

    console.log("Log 2");
    const isUserExistByPhone = await getUserByPhone(reqBody.phone_number);
    console.log("Log 3");
    if (isUserExistByPhone) {
      return NextResponse.json(
        {
          message: "User already exist By this phone number",
          user: isUserExistByPhone,
        },
        { status: 400 },
      );
    }

    console.log("Log 4");
    const user = await createUser({ data: reqBody });

    console.log("Log 5");
    return NextResponse.json({
      message: "User created successfully. Please Login",
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error,
      },
      { status: 500 },
    );
  }
}
