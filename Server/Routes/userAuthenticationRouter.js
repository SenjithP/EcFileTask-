import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
  userEmailVerification
} from "../Controllers/userAuthenticationController.js";
import userVerifyToken from "../Middlewares/userAuthenticationMiddleware.js";

const authenticationRouter = express.Router();
 
//POST Methods

authenticationRouter.post("/userRegistration", userRegistration);
authenticationRouter.post("/verifyEmail", userEmailVerification);
authenticationRouter.post("/userLogin", userLogin);
authenticationRouter.post("/userLogout", userVerifyToken,userLogout);

export default authenticationRouter;
