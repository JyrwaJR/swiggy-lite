import { numberRegex } from "@src/utils/regex/number";
import { z } from "zod";
import { passwordValidation } from "./passwordValidiation";
// User Schema
export const registerSchema = z
  .object({
    email: z.string().email(), // Ensures a valid email format
    user_name: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .trim(),
    password: passwordValidation,
    confirm_password: passwordValidation,
    phone_number: z
      .string()
      .regex(numberRegex) // Basic validation
      .min(10, "Phone number must be valid")
      .trim(),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

// TypeScript Type (Optional)
export type RegistrationType = z.infer<typeof registerSchema>;
