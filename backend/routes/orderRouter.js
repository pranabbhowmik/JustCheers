import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listorders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/order.controllers.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/listorders", listorders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
