import express from "express";
import { addFood } from "../controllers/drinkController.js";
import multer from "multer";

const foodRouter = express.Router();

foodRouter.post("/add", addFood); // add food

export default foodRouter;
