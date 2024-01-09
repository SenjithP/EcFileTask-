import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import { generateUserToken } from "../Utils/generateToken.js";
import { sendVerifyMail } from "../Utils/emailService.js";
import { validateUserRegistration } from "../Utils/registerValidation.js";
import cloudinary from "cloudinary";

//REGISTER USER
export const userRegistration = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      userPassword,
      userMobileNumber,
      profileImage,
    } = req.body;
    const validationResult = validateUserRegistration({
      userName,
      userEmail,
      userPassword,
      userMobileNumber,
    });
    let profileImages;

    if (!validationResult.valid) {
      const error = new Error(validationResult.message);
      error.statusCode = validationResult.statusCode || 500;
      throw error;
    }
    const ifUserExists = await User.findOne({
      userMobileNumber: userMobileNumber,
    });

    if (ifUserExists) {
      const error = new Error("User With This Mobile Number Already Exists");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      const error = new Error("User with this email already exists.");
      error.statusCode = 400;
      throw error;
    } else {
      if (profileImage) {
        profileImages = await cloudinary.uploader.upload(profileImage, {
          folder: "profileImages",
        });
      }

      const hashPassword = await bcrypt.hash(userPassword, 10);
      const user = new User({
        userName,
        userEmail,
        userPassword: hashPassword,
        userMobileNumber,
        profileImage: profileImages.secure_url,
      });
      const userData = await user.save();
      if (userData) {
        sendVerifyMail(req.body.userName, req.body.userEmail, userData._id);
        res.status(201).json({
          message:
            "User registered successfully, Please Verify Your Email to Continue",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

//VERIFING EMAIL
export const userEmailVerification = async (req, res) => {
  try {
    const id = req.body.id;
    const userData = await User.findById(id);

    if (userData) {
      userData.isVerified = true;
      await userData.save();
      res.status(201).json({
        message: "Email Verification Success",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// USER LOGIN
export const userLogin = async (req, res) => {
  try {
    const { userMobileNumber, userPassword } = req.body;
    if (
      !userMobileNumber ||
      userMobileNumber.trim().length === 0 ||
      !userPassword ||
      userPassword.trim().length === 0
    ) {
      const error = new Error("All fields are required..");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ userMobileNumber });
    if (!user) {
      const error = new Error("Invalid Mobile Number or Password");
      error.statusCode = 400;
      throw error;
    }
    if (user.isVerified !== true) {
      const error = new Error("Please Verify Your Mail Id To Continue");
      error.statusCode = 400;
      throw error;
    }
    const verifiedPassword = await bcrypt.compare(
      userPassword,
      user.userPassword
    );
    if (verifiedPassword) {
      generateUserToken(res, user._id);
      res.status(201).json({
        message: "Login Successful",
        name: user.userName,
        email: user.userEmail,
        id: user._id,
      });
    } else {
      const error = new Error("Invalid Mobile Number or Password");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// USER LOGOUT
export const userLogout = async (req, res) => {
  try {
    res.cookie("userjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
