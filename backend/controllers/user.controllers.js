import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// User Registion methods
const registion = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "User already exist" });
    }
    const user = new User({ name, email, password });
    const userSaved = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", data: userSaved });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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

    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Login Problem" });
  }
};

export { registion, login };
