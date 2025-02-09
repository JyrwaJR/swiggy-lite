import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { CustomMiddleware } from "./chainMiddleware";

export function loggerMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // The first middleware in the chain has to create the response
    // object and pass it down the chain.
    const response = NextResponse.next();

    // Perform whatever logic the first middleware needs to do
    // Call the next middleware and pass the request and response
    return middleware(request, event, response);
  };
}
