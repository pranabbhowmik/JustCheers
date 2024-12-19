import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { BadgePercent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    updateQuantity,
    getTotalCartAmount,
    url,
    addToCart,
    removeFromCart,
  } = useContext(StoreContext);
  const [selectedTip, setSelectedTip] = useState(null);

  const tipOptions = [20, 30, 50, 60];

  const handleTipSelect = (amount) => {
    if (selectedTip === amount) {
      setSelectedTip(null);
    } else {
      setSelectedTip(amount);
    }
  };

  return (
    <div className="mt-10 px-4 lg:px-8">
      {/* Cart Items Section */}
      <div className="bg-white shadow rounded-lg p-6">
        {food_list.filter((food) => cartItems[food._id]).length > 0 ? (
          food_list
            .filter((food) => cartItems[food._id])
            .map((item) => {
              const cartItem = cartItems[item._id];
              const totalItemPrice =
                (cartItem.price || 0) * (cartItem.quantity || 0);

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4"
                >
                  {/* Item Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={`${url}/${item.image}`}
                      alt={item.name}
                      className="w-20 h-28 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {cartItem.size ? `[${cartItem.size}]` : ""}
                      </p>
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            removeFromCart(item._id, item.size, item.price)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        >
                          &minus;
                        </button>
                        <span className="mx-4 font-semibold text-gray-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            addToCart(item._id, item.size, item.price)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Item Price */}
                  <div>
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

      {/* Coupon Section */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <BadgePercent className="w-6 h-6 text-gray-700" />
            <p className="text-gray-800 font-semibold">Apply Coupon</p>
          </div>
          <input
            type="text"
            className="w-full sm:flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter coupon code"
          />
          <button className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Apply
          </button>
        </div>
      </div>

      {/* Tip Section */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <div className="space-y-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Say thanks with a Tip!
          </h2>
          <p className="text-sm text-gray-600">
            Day & night, our delivery partners bring your favourite meals. Thank
            them with a tip.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {tipOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => handleTipSelect(amount)}
              className={`py-2 px-4 rounded border transition
                ${
                  selectedTip === amount
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
      </div>

      {/* Bill Details */}
      <div className="bg-gray-100 shadow rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Bill Details
        </h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Item Total</span>
            <span className="font-semibold text-gray-800">
              ₹{getTotalCartAmount()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-semibold text-gray-800">₹25</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Tip</span>
            <span className="font-semibold text-gray-800">
              ₹{selectedTip || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span className="font-semibold text-gray-800">₹5</span>
          </div>
          <div className="flex justify-between">
            <span>GST Charges</span>
            <span className="font-semibold text-gray-800">
              ₹{(getTotalCartAmount() * 0.05).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
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
              {(
                getTotalCartAmount() +
                25 +
                (selectedTip || 0) +
                5 -
                10
              ).toFixed(2)}
            </span>
          </div>
          <div className="text-green-500 text-sm font-medium">You save ₹10</div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full bg-red-500 text-white rounded-lg py-3 mt-6 hover:bg-red-600"
        onClick={() => navigate("/order")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
