import User from "../Models/userSchema.js";


// VIEW PROFILE 
export const viewUsers = async (req, res) => {
    try {
      const userId = req.query.id;
      const userDetails = await User.findById(userId);
  
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