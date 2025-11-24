import { TCreateUserDTO, TUpdateUserDTO } from "../dtos/user.dto";
import {
  IUserRepository,
  UserRepository,
} from "../repositories/user.repository";
import { TUser } from "../types/user.type";

const userRepository: IUserRepository = new UserRepository();

export class UserService {
  getAllUsers = (): TUser[] => {
    return userRepository.getAllUsers();
  };

  getUserById = (id: string): TUser | undefined => {
    return userRepository.getUserById(id);
  };

  createUser = (userData: TCreateUserDTO): TUser => {
    const newUser: TUser = { ...userData };

    const userExistsById = userRepository.getUserById(newUser.id);
    if (userExistsById) {
      throw new Error("User with this ID already exists!");
    }

    const userExistsByEmail = userRepository.getUserByEmail(newUser.email);
    if (userExistsByEmail) {
      throw new Error("User with this email already exists!");
    }

    const userExistsByUsername = userRepository.getUserByUsername(
      newUser.username
    );
    if (userExistsByUsername) {
      throw new Error("User with this username already exists!");
    }

    return userRepository.createUser(newUser);
  };

  updateUser = (id: string, userData: TUpdateUserDTO): TUser | undefined => {
    const existingUser = userRepository.getUserById(id);
    if (!existingUser) {
      throw new Error("User not found!");
    }

    if (userData.email) {
      const userExistsByEmail = userRepository.getUserByEmail(userData.email);
      if (userExistsByEmail) {
        throw new Error("User with this email already exists!");
      }
    }

    if (userData.username) {
      const userExistsByUsername = userRepository.getUserByUsername(
        userData.username
      );
      if (userExistsByUsername) {
        throw new Error("User with this username already exists!");
      }
    }

    const updatedUser = {
      ...existingUser,
      ...userData,
    };

    return userRepository.updateUser(id, updatedUser);
  };

  deleteUser = (id: string): TUser | undefined => {
    const existingUser = userRepository.getUserById(id);
    if (!existingUser) {
      throw new Error("User not found!");
    }

    return userRepository.deleteUser(id);
  };
}
