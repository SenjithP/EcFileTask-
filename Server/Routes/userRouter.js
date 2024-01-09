import express from "express";
import { viewUsers } from "../Controllers/userController.js";
import userVerifyToken from "../Middlewares/userAuthenticationMiddleware.js";

const userRouter = express.Router();

//GET Methods

userRouter.get("/viewUsers",userVerifyToken, viewUsers);

export default userRouter;
