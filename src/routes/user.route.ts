import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter: Router = Router();
const userController = new UserController();

// GET all users -
userRouter.get("/", userController.getUsers);

// GET single user -
userRouter.get("/:id", userController.getUserById);

// POST new user -
userRouter.post("/", userController.createUser);

// PUT update user -
userRouter.put("/:id", userController.updateUser);

// DELETE user -
userRouter.delete("/:id", userController.deleteUser);

export { userRouter };
