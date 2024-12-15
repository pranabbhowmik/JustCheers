import express from "express";
import { login, registion } from "../controllers/user.controllers.js";

const authRouter = express.Router();

authRouter.post("/register", registion);
authRouter.post("/login", login);
export default authRouter;
