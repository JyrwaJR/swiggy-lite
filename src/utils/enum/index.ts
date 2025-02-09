import { z } from "zod";

export const RolesEnum = z.enum(["ADMIN", "Customer", "Delivery"]);
