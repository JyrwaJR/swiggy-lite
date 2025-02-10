import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    JWT_EXPIRES_IN: z.string(),
    JWT_SECRET_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  },
});
