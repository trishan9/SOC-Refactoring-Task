import { z } from "zod";
import { userSchema } from "../types/user.type";

export const CreateUserDTO = userSchema.pick({
  id: true,
  username: true,
  email: true,
  name: true,
  age: true,
});
export const UpdateUserDTO = userSchema.pick({
  username: true,
  email: true,
  name: true,
  age: true,
});
export type TCreateUserDTO = z.infer<typeof CreateUserDTO>;
export type TUpdateUserDTO = z.infer<typeof UpdateUserDTO>;
