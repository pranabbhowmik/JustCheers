import User from "../models/userModel.js";

// add to cart
const addToCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);

    const cartData = userData.cartData || {};

    const { itemId, size, price } = req.body;

    // If the item doesn't exist in the cart, initialize it with size, price, and quantity
    if (!cartData[itemId]) {
      cartData[itemId] = { quantity: 1, size, price };
    } else {
      cartData[itemId].quantity += 1;
    }
    console.log(cartData);
    await User.findByIdAndUpdate(req.userId, { cartData });
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
    const { itemId } = req.body;
    console.log(itemId);
    const userData = await User.findById(req.userId);
    const cartData = userData.cartData;
    console.log(cartData);
    if (cartData[itemId]) {
      cartData[itemId].quantity -= 1;
      if (cartData[itemId].quantity === 0) {
        delete cartData[itemId];
      }
    }
    await User.findByIdAndUpdate(req.userId, { cartData });
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
    let userData = await User.findById(req.userId);
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
