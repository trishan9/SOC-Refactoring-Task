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
      return res.status(404).json({ error: "User ID is required!" });
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
    try {
      const validation = CreateUserDTO.safeParse(req.body);
      if (!validation.success) {
        return res.status(404).json({ errors: validation.error.issues });
      }

      const { id, name, email, username, age } = validation.data;
      const newUser: TUser = userService.createUser({
        id,
        username,
        name,
        email,
        age: age || undefined,
      });

      return res.status(200).json({
        data: newUser,
        message: "User created successfully!",
      });
    } catch (err: Error | any) {
      return res.status(500).json({
        error: err.message ?? "Internal Server Error!",
      });
    }
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "User ID is required!" });
    }

    const deletedUser = userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ error: "User ID is required!" });
    }

    const validation = UpdateUserDTO.safeParse(req.body);
    if (!validation.success) {
      return res.status(404).json({ errors: validation.error.issues });
    }

    const { name, email, username, age } = validation.data;
    const updatedUser: TUser | undefined = userService.updateUser(id, {
      username,
      name,
      email,
      age,
    });

    return res.status(200).json({
      data: updatedUser,
      message: "User updated successfully!",
    });
  };
}
