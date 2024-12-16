import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  try {
    const token_decod = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decod.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "You must be logged in" });
  }
};

export default authMiddleware;
