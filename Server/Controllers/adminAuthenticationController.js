import Admin from "../Models/adminSchema.js";
import { generateAdminToken } from "../Utils/generateToken.js";

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
    try {
      const { adminEmail, adminPassword } = req.body;
      if (
        !adminEmail ||
        adminEmail.trim().length === 0 ||
        !adminPassword ||
        adminPassword.trim().length === 0
      ) {
        const error = new Error("All fields are required..");
        error.statusCode = 400;
        throw error;
      }
      const admin = await Admin.findOne({ adminEmail });
      if (!admin) {
        const error = new Error("Invalid Email or Password");
        error.statusCode = 400;
        throw error;
      }
   
      if (admin.adminPassword === adminPassword ) {
        generateAdminToken(res, admin._id);
        res.status(201).json({
          message: "Login Successful",
          email: admin.adminEmail,
          id: admin._id,
        });
      } else {
        const error = new Error("Invalid Email or Password");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  // ADMIN LOGOUT
  export const adminLogout = async (req, res) => {
    try {
      res.cookie("adminjwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logout successful" }); 
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "An error occurred during Logout." });
    }
  };