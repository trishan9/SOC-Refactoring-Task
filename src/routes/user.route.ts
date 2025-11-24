import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

const userRouter: Router = Router();
const userController = new UserController();

// GET all users -
userRouter.get("/", userController.getUsers);

// GET single user -
userRouter.get("/:id", userController.getUserById);

// POST new user -
userRouter.post("/", validate(CreateUserDTO), userController.createUser);

// PUT update user -
userRouter.put("/:id", validate(UpdateUserDTO), userController.updateUser);

// DELETE user -
userRouter.delete("/:id", userController.deleteUser);

export { userRouter };
