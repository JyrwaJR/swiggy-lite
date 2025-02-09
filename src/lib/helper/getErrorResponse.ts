import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null,
) {
  return new NextResponse(
    JSON.stringify({
      status: 400,
      message,
      errors: errors,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}
