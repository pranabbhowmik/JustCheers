import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://just-cheers-backend.onrender.com";
   // const url = "https://just-cheers-backend.vercel.app/";
  // const url = "http://localhost:5000";
  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  // ADD to CART
  const addToCart = async (itemId, size, price) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: { quantity: 1, size, price: price || 0 }, // Ensure price is valid
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: prev[itemId].quantity + 1,
          size: size || prev[itemId].size, // Retain the existing size
          price: price || prev[itemId].price, // Retain the existing price
        },
      }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId, size, price },
        { headers: { token } }
      );
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
    if (token) {
      axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
    console.log("Removed from cart:", token);
  };

  // Add the updateQuantity function in StoreContextProvider
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (newQuantity <= 0) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] = {
          ...updatedCart[itemId],
          quantity: newQuantity,
        };
      }

      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((total, item) => {
      // Ensure item and item.price exist before trying to access item.price
      const price = item?.price ?? 0; // Default to 0 if item or item.price is null/undefined
      const quantity = item?.quantity ?? 0; // Default to 0 if quantity is null/undefined

      return total + price * quantity; // Calculate total cart amount
    }, 0);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token },
      });
      const serverCartData = response.data.cartData;

      // Fallback to empty object if serverCartData is invalid
      const validCartData = serverCartData || {};

      // Update state and localStorage
      setCartItems(validCartData);
      localStorage.setItem("cartItems", JSON.stringify(validCartData));
    } catch (error) {
      console.error("Error loading cart data:", error);

      // Fallback to localStorage if API fails
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      const data = response.data;
      setFoodList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCartItems = localStorage.getItem("cartItems");

    async function loadData() {
      await fetchFoodList();

      if (storedToken) {
        setToken(storedToken);
        // Fetch data from the server if token is available
        await loadCartData(storedToken);
      } else {
        console.log("Token not found!");
        // You can load cart from localStorage as a fallback when no token
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems)); // Set cart items from localStorage
        }
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    updateQuantity,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
