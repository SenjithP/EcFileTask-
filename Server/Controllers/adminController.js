import User from "../Models/userSchema.js";

// GET USER DETAILS 
export const getUserDetails = async (req, res) => {
    try {
      const userDetails = await User.find({});
  
      if (!userDetails) {
        const error = new Error("No User Data Found");
        error.statusCode = 400;
        throw error;
      } else {
        res.status(200).json({ userDetails });
      }
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };