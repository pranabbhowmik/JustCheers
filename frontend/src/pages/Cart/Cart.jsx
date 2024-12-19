import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { BadgePercent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    setToken,
    getTotalCartAmount,
    url,
    addToCart,
    removeFromCart,
  } = useContext(StoreContext);
  const [selectedTip, setSelectedTip] = useState(null); // Selected tip amount
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tipOptions = [20, 30, 50, 60];

  const handleTipSelect = (amount) => {
    if (selectedTip === amount) {
      setSelectedTip(null); // Deselect if clicked twice
    } else {
      setSelectedTip(amount); // Select new tip
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="mt-10 p-4">
        <div className="text-center text-gray-500 py-6">
          Please log in to view your cart.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 p-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        {food_list.filter((food) => cartItems[food._id]).length > 0 ? (
          food_list
            .filter((food) => cartItems[food._id]) // Filter only items in the cart
            .map((item) => {
              const cartItem = cartItems[item._id];

              // Calculate the total price for the current item
              const totalItemPrice =
                (cartItem.price || 0) * (cartItem.quantity || 0);

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4"
                >
                  {/* Product Name */}
                  <div className="w-full sm:w-auto grid grid-cols-2">
                    <img
                      src={`${url}/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20"
                    />
                    <p className="font-semibold text-gray-800">
                      {item.name}{" "}
                      <span className="text-sm text-gray-500">
                        {cartItem.size ? `[${cartItem.size}]` : ""}
                      </span>
                      {/* Quantity and Actions */}
                      <div className="flex items-center mt-3 sm:mt-0">
                        {/* Decrease Button */}
                        <button
                          onClick={() =>
                            removeFromCart(item._id, item.size, item.price)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        >
                          &minus;
                        </button>

                        {/* Quantity */}
                        <span className="mx-4 font-semibold text-gray-800">
                          {cartItem.quantity}
                        </span>

                        {/* Increase Button */}
                        <button
                          onClick={() =>
                            addToCart(item._id, item.size, item.price)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-3 sm:mt-0">
                    <p className="font-semibold text-gray-800">
                      ₹{totalItemPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="text-center text-gray-500 py-6">
            Your cart is empty.
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        {/* Responsive container */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <BadgePercent className="w-6 h-6" />
            <p className="text-gray-800 font-semibold">APPLY COUPON</p>
          </div>
          {/* Input Field */}
          <input
            type="text"
            className="w-full sm:w-auto flex-1 border p-2 rounded mt-2 sm:mt-0"
            placeholder="Enter coupon code"
          />
          <button className="w-full sm:w-44 sm:-mt-1 h-11 bg-red-500 text-white rounded-lg p-2 mt-2">
            APPLY
          </button>
        </div>
      </div>
      <div className="max-w-sm p-4 rounded-lg bg-white shadow mt-4 sm:mt-6 lg:max-w-full lg:flex lg:items-center lg:justify-between">
        {/* Text Section */}
        <div className="space-y-2 mb-4 lg:mb-0 lg:mr-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Say thanks with a Tip!
          </h2>
          <p className="text-sm text-gray-600">
            Day & night, our delivery partners bring your favourite meals. Thank
            them with a tip.
          </p>
        </div>

        {/* Tip Buttons */}
        <div className="flex gap-3 flex-wrap lg:justify-end">
          {tipOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => handleTipSelect(amount)}
              className={`py-2 px-4 rounded-md border transition-colors lg:py-3 lg:px-6
          ${
            selectedTip === amount
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
      </div>
      <br />
      <hr className="bg-gray-50 h-1 " />
      <div className="bg-gray-100 shadow-md rounded-lg p-4 mt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Bill Details
        </h2>
        <div className="space-y-3 text-gray-600 text-sm">
          {/* Item Total */}
          <div className="flex justify-between">
            <span>Item Total</span>
            <span className="font-semibold text-gray-800">
              ₹{getTotalCartAmount()}
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between items-center">
            <span>
              Delivery Fee
              <span className="text-xs text-gray-400 block">
                This fee fairly goes to our delivery partners for delivering
                your food
              </span>
            </span>
            <span className="font-semibold text-gray-800">₹{25}</span>
          </div>

          {/* Extra Discount if the Promo code is applied */}
          {/* <div className="flex justify-between">
            <span>Extra discount for you</span>
            <span className="font-semibold text-red-500">-₹25</span>
          </div> */}

          {/* Delivery Tip */}
          <div className="flex justify-between">
            <span>Delivery Tip</span>
            <span className="font-semibold text-gray-800">
              ₹{selectedTip || 0}
            </span>
          </div>

          {/* Platform Fee */}
          <div className="flex justify-between">
            <span>Platform fee</span>
            <span className="font-semibold text-gray-800">₹5.00</span>
          </div>

          {/* GST and Restaurant Charges */}
          <div className="flex justify-between">
            <span>GST Charges</span>
            <span className="font-semibold text-gray-800">
              ₹{getTotalCartAmount() * 0.05}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-500 text-sm line-through">
              ₹
              {getTotalCartAmount() +
                25 +
                (selectedTip || 0) +
                5 +
                getTotalCartAmount() * 0.03}
            </span>
            <span className="font-semibold text-xl text-gray-800">
              ₹
              {getTotalCartAmount() +
                25 +
                (selectedTip || 0) -
                5 +
                getTotalCartAmount() * 0.03}
            </span>
          </div>
          <div className="text-green-500 text-sm font-medium">
            You save ₹{10}
          </div>
        </div>
      </div>
      <button
        className="w-full bg-red-500 text-white rounded-lg p-2 mt-4"
        onClick={() => navigate("/order")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
