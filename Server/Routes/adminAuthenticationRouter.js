import express from "express";
import { adminLogin, adminLogout } from "../Controllers/adminAuthenticationController.js";
import adminVerifyToken from "../Middlewares/adminAuthenticationMiddleware.js";

const adminRouter = express.Router();


//POST Methods

adminRouter.post("/adminLogin", adminLogin);
adminRouter.post("/adminLogout",adminVerifyToken, adminLogout);

export default adminRouter;
