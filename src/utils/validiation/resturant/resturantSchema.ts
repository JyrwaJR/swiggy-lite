import { z } from "zod";
import { numberRegex } from "@utils/regex/number";
import { menuItemSchema } from "../menu/menuItemSchema";

export const restaurantSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().optional(),
  phoneNumber: z.string().regex(numberRegex, "Invalid phone number").optional(),
  logoUrl: z.string().url("Invalid URL").optional(),
  isActive: z.boolean().default(true).optional(),
  menuItems: z.array(menuItemSchema).optional(),
});

export type RestaurantType = z.infer<typeof restaurantSchema>;
