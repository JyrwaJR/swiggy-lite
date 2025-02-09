import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { CustomMiddleware } from "./chainMiddleware";
import { getUserById } from "@/src/services/user/getUserById";
import { verifyJWT } from "@/src/lib/token";

export function authMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const header = request.headers.get("Authorization");
    const url = request.url;
    const response = NextResponse.next();

    // List of public paths that don't require authentication
    const publicPaths = [
      "/api/auth",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/reset-password",
    ];

    // Check if the current URL matches any public path
    const isPublicPath = publicPaths.some((path) => url.includes(path));

    // Only apply the authentication check for routes that are not public paths
    if (!isPublicPath) {
      if (!header) {
        // No Authorization header, return 401 Unauthorized
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      try {
        // Extract JWT from the Authorization header and verify it
        const jwt = await verifyJWT<{ sub: string }>(header);
        // Retrieve the user associated with the JWT
        const user = await getUserById(jwt.sub);

        // If the user doesn't exist or the token is invalid, return Unauthorized
        if (!user) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
      } catch (error) {
        // If there's an error in verifying the JWT, return Unauthorized
        // TODO : Handle JWT errors
        console.log(error);
        return NextResponse.json(
          { message: "Unauthorized", error },
          { status: 401 },
        );
      }
    }

    // Proceed to the next middleware or handler
    return middleware(request, event, response);
  };
}
