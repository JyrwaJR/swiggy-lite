import { z } from "zod";

const numberRegex = /[0-9]/; // Ensuring it checks for at least one digit
const specialCharRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // Special characters
const upperCaseRegex = /[A-Z]/; // Uppercase letter regex
const lowerCaseRegex = /[a-z]/; // Lowercase letter regex

export const passwordValidation = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, "Password must be at least 8 characters")
  .regex(numberRegex, "Password must contain at least one number")
  .regex(
    specialCharRegex,
    "Password must contain at least one special character",
  )
  .regex(upperCaseRegex, "Password must contain at least one uppercase letter")
  .regex(lowerCaseRegex, "Password must contain at least one lowercase letter");
