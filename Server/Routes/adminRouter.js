import express from "express";
import { getUserDetails } from "../Controllers/adminController.js";
import adminVerifyToken from "../Middlewares/adminAuthenticationMiddleware.js";


const adminRouter = express.Router();

//GET Methods

adminRouter.get("/getUserDetails",adminVerifyToken, getUserDetails);

export default adminRouter;
