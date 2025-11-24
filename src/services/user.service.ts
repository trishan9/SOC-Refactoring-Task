import { TCreateUserDTO, TUpdateUserDTO } from "../dtos/user.dto";
import {
  IUserRepository,
  UserRepository,
} from "../repositories/user.repository";
import { TUser } from "../types/user.type";
import { ApiError } from "../utils/apiError";

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
      throw new ApiError("User with this ID already exists!", 400);
    }

    const userExistsByEmail = userRepository.getUserByEmail(newUser.email);
    if (userExistsByEmail) {
      throw new ApiError("User with this email already exists!", 400);
    }

    const userExistsByUsername = userRepository.getUserByUsername(
      newUser.username
    );
    if (userExistsByUsername) {
      throw new ApiError("User with this username already exists!", 400);
    }

    return userRepository.createUser(newUser);
  };

  updateUser = (id: string, userData: TUpdateUserDTO): TUser | undefined => {
    const existingUser = userRepository.getUserById(id);
    if (!existingUser) {
      throw new ApiError("User not found!", 404);
    }

    if (userData.email) {
      const userExistsByEmail = userRepository.getUserByEmail(userData.email);
      if (userExistsByEmail) {
        throw new ApiError("User with this email already exists!", 400);
      }
    }

    if (userData.username) {
      const userExistsByUsername = userRepository.getUserByUsername(
        userData.username
      );
      if (userExistsByUsername) {
        throw new ApiError("User with this username already exists!", 400);
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
      throw new ApiError("User not found!", 400);
    }

    return userRepository.deleteUser(id);
  };
}
