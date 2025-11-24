import { z } from "zod";
import { userSchema } from "../types/user.type";

export const CreateUserDTO = userSchema
  .pick({
    id: true,
    username: true,
    email: true,
    name: true,
    age: true,
  })
  .strict();

export const UpdateUserDTO = userSchema
  .partial()
  .pick({
    username: true,
    email: true,
    name: true,
    age: true,
  })
  .strict();

export type TCreateUserDTO = z.infer<typeof CreateUserDTO>;
export type TUpdateUserDTO = z.infer<typeof UpdateUserDTO>;
