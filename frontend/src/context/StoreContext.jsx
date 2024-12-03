import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // ADD to CART
  const addToCart = async (itemId, size, price) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: { quantity: 1, size, price },
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: { quantity: prev[itemId].quantity + 1, size, price },
      }));
    }
  };

  // REMOVE from CART
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      // Check if the item exists in the cart
      if (!prev[itemId]) return prev;

      // Create a new cart object with updated quantity
      const newCart = { ...prev, [itemId]: { ...prev[itemId] } };

      newCart[itemId].quantity -= 1; // Decrement quantity

      // Remove item if quantity is 0 or less
      if (newCart[itemId].quantity <= 0) {
        const { [itemId]: _, ...rest } = newCart; // Remove item using object destructuring
        return rest;
      }

      return newCart;
    });
  };

  // Add the updateQuantity function in StoreContextProvider
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[itemId]) {
        if (newQuantity <= 0) {
          // Remove item if the new quantity is 0 or less
          delete updatedCart[itemId];
        } else {
          // Update the quantity
          updatedCart[itemId].quantity = newQuantity;
        }
      }

      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const cartItem = cartItems[itemId]; // Get the cart item object
      totalAmount += cartItem.price * cartItem.quantity; // Multiply price by quantity
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    updateQuantity,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
