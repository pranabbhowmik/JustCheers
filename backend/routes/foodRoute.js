import express from "express";
import fs from "fs";
import multer from "multer";
import {
  addFood,
  getFoodsList,
  removeFood,
} from "../controllers/drinkController.js";

const foodRouter = express.Router();

// Image Storage Path
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood); // add food
foodRouter.get("/list", getFoodsList); // get food list
foodRouter.post("/remove", removeFood); //remove food

export default foodRouter;
