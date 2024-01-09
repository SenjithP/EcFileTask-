import jwt from "jsonwebtoken";

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development", 
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const generateUserToken = (res, userId) => {
  try {
    if (!process.env.USER_JWT_SECRET) {
      return new Error("JWT secret is not defined.");
    }

    const token = jwt.sign({ userId }, process.env.USER_JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("userjwt", token, COOKIE_CONFIG);
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating user token.");
  }
};

export const generateAdminToken = (res, adminId) => {
  try {
    if (!process.env.ADMIN_JWT_SECRET) {
      return new Error("JWT secret is not defined.");
    }

    const token = jwt.sign({ adminId }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("adminjwt", token, COOKIE_CONFIG);
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating admin token.");
  }
};