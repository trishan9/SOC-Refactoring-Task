import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { TUser } from "../types/user.type";

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
      success: true,
      user: return_user,
    });
  };

  createUser = (req: Request, res: Response) => {
    const { id, name, email, username, age } = req.body as TUser;

    const newUser: TUser = userService.createUser({
      id,
      username,
      name,
      email,
      age: age || undefined,
    });

    return res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully!",
    });
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "User ID is required!" });
    }

    const updatedUser: TUser | undefined = userService.updateUser(
      id,
      req.body as Partial<TUser>
    );

    return res.status(200).json({
      success: true,
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
      success: true,
      message: "User deleted successfully!",
    });
  };
}
