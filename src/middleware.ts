import { chainMiddleware } from "./utils/middleware/chainMiddleware";
import { loggerMiddleware } from "./utils/middleware/loggerMiddleware.ts";

export default chainMiddleware([loggerMiddleware]);

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
