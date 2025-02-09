import { z } from "zod";

// Define the Zod schema for the MenuItem
export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().int().positive("Price must be a positive integer"),
  category: z.string().min(1, "Category is required"),
  is_available: z.boolean().default(true),
  image_url: z.string().url("Image URL must be a valid URL"),
  restaurant_id: z
    .string()
    .length(24, "Restaurant ID must be a valid ObjectId")
    .optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

// Type for MenuItem
export type MenuItemType = z.infer<typeof menuItemSchema>;
