import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/db.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js";

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// app middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("uploads"));
app.use(cors());

// app routes
app.use("/api/food", foodRouter);
app.use("/api/user", authRouter);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log("Error in connecting to DB", err.message);
    process.exit(1);
  });
