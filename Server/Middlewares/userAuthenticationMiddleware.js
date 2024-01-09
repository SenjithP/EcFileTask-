import jwt from "jsonwebtoken";

const userVerifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "USER_JWT_SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

export default userVerifyToken;
