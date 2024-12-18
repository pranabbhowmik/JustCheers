import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  // Step 2: Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  try {
    // Step 3: Try decoding the token
    const token_decod = jwt.verify(token, process.env.JWT_SECRET);

    // Step 5: Assign the decoded userId to req.userId
    req.userId = token_decod.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "You must be logged in" });
  }
};

export default authMiddleware;
