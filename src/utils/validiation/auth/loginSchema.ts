import { z } from "zod";
import { passwordValidation } from "./passwordValidiation";
// User Schema
export const loginSchema = z.object({
  email: z.string().email().trim(), // Ensures a valid email format
  password: passwordValidation,
});

// TypeScript Type (Optional)
export type UserType = z.infer<typeof loginSchema>;
