import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1, { message: "User ID is required" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .min(5, { message: "Book Title must be greater than 5 characters" }),
  email: z.email().min(1, { message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  age: z.number().optional(),
});
export type TUser = z.infer<typeof userSchema>;
