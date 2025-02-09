import { RolesEnum } from "@src/utils/enum";
import { numberRegex } from "@src/utils/regex/number";
import { z } from "zod";
// User Schema
export const userSchema = z.object({
  id: z.string().uuid().optional(), // MongoDB ObjectId, optional for creation
  isActive: z.boolean().default(true),
  role: RolesEnum.default("Customer"), // Enum validation
  phone_number: z
    .string()
    .regex(numberRegex) // Basic validation
    .min(10, "Phone number must be valid"),
  created_at: z
    .date()
    .default(() => new Date())
    .optional(), // Auto-default for timestamps
  updated_at: z.string().optional(),
});

// TypeScript Type (Optional)
export type UserType = z.infer<typeof userSchema>;
