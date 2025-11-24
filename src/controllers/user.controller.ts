import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { TUser } from "../types/user.type";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

const userService = new UserService();

export class UserController {
  getUsers = (_: Request, res: Response) => {
    const return_users: TUser[] = userService.getAllUsers();

    return res.status(200).json({
      data: return_users,
    });
  };

  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required!" });
    }

    const return_user: TUser | undefined = userService.getUserById(id);
    if (!return_user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json({
      user: return_user,
    });
  };

  createUser = (req: Request, res: Response) => {
    const validation = CreateUserDTO.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { id, name, email, username, age } = validation.data;

    const newUser: TUser = userService.createUser({
      id,
      username,
      name,
      email,
      age: age || undefined,
    });

    return res.status(201).json({
      data: newUser,
      message: "User created successfully!",
    });
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "User ID is required!" });
    }

    const validation = UpdateUserDTO.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const updatedUser: TUser | undefined = userService.updateUser(
      id,
      validation.data
    );

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "User ID is required!" });
    }

    userService.deleteUser(id);

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  };
}
