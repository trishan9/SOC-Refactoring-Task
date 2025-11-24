import { TUser } from "../types/user.type";

export const users: TUser[] = [
  {
    id: "user1",
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    age: 30,
  },
  {
    id: "user2",
    username: "jane_smith",
    email: "jane@example.com",
    name: "Jane Smith",
    age: 25,
  },
];

export interface IUserRepository {
  getAllUsers(): TUser[];
  getUserById(id: string): TUser | undefined;
  getUserByEmail(email: string): TUser | undefined;
  getUserByUsername(username: string): TUser | undefined;
  createUser(user: TUser): TUser;
  updateUser(id: string, user: Partial<TUser>): TUser | undefined;
  deleteUser(id: string): TUser | undefined;
}

export class UserRepository implements IUserRepository {
  getAllUsers(): TUser[] {
    return users;
  }

  getUserById(id: string): TUser | undefined {
    return users.find((user) => user.id === id);
  }

  getUserByEmail(email: string): TUser | undefined {
    return users.find((user) => user.email === email);
  }

  getUserByUsername(username: string): TUser | undefined {
    return users.find((user) => user.username === username);
  }

  createUser(user: TUser): TUser {
    users.push(user);
    return user;
  }

  updateUser(id: string, user: Partial<TUser>): TUser | undefined {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return undefined;

    users[userIndex] = {
      ...users[userIndex],
      ...user,
    };

    return users[userIndex];
  }

  deleteUser(id: string): TUser | undefined {
    const userIndex = users.findIndex((u) => u.id === id);
    const deletedUser = users[userIndex];

    users.splice(userIndex, 1);
    return deletedUser;
  }
}
