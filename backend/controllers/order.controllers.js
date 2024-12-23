import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPEKEY);

// placing user order for foontend
const placeOrder = async (req, res) => {
  const url = "https://justcheers.vercel.app//orderdone";
  // const url = "http://localhost:5173/orderdone";
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const newOrder = new Order({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items
      .map((item) => {
        // Product line item
        const productLineItem = {
          price_data: {
            currency: "inr",
            product_data: { name: item.name },
            unit_amount: item.price * 100, // Price in paise
          },
          quantity: item.quantity,
        };

        // GST line item (3% of product price)
        const gstAmount = item.price * 0.03; // Calculate 3% GST
        const gstLineItem = {
          price_data: {
            currency: "inr",
            product_data: { name: `${item.name} - GST (3%)` },
            unit_amount: Math.round(gstAmount * 100), // Convert to paise
          },
          quantity: item.quantity, // Same quantity as product
        };

        return [productLineItem, gstLineItem];
      })
      .flat(); // Flatten to combine all line items into one array

    // Adding Delivery Charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 25 * 100, // Convert to paise
      },
      quantity: 1,
    });

    // Adding Platform Fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Platform fee" },
        unit_amount: 5 * 100, // Convert to paise
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${url}?success=true&orderId=${newOrder._id}`,
      cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// verify order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true" || success === true) {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// userorders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// listorder fro admin
const listorders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// oredr status update
const updateStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listorders, updateStatus };
