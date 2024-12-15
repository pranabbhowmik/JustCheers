import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// creat toket
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// User Registion methods
const registion = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Create new user
    const user = new User({ name, email, password });
    const userSaved = await user.save();

    // Create a token for the user
    const token = createToken(user._id);

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      token,
      data: userSaved,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User Login methods
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Use bcrypt.compare to validate the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Create a token for the user
    const token = createToken(user._id);

    // Send response
    res.status(201).json({
      message: "User Login successfully",
      token,
      data: user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Login Problem" });
  }
};

export { registion, login };
