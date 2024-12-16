import User from "../models/userModel.js";

// add to cart
const addToCart = async (req, res) => {
  try {
    // we are getting userId from auth middleware
    const userData = await User.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error while saving items to the Cart",
    });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await User.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId]) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while removing items from the Cart",
    });
  }
};

// get cart
const getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while getting items from the Cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
