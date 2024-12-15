import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Plus, Minus } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, quantity, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const [selectedSize, setSelectedSize] = useState(quantity[0].size);
  const [currentPrice, setCurrentPrice] = useState(quantity[0].price);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const newPrice =
      quantity.find((q) => q.size === size)?.price || currentPrice;
    setCurrentPrice(newPrice);
  };

  return (
    <div className="max-w-2xl mx-auto p-3">
      <div className="flex justify-between items-start gap-4 border-b border-gray-100 pb-6">
        <div className="flex-1">
          {/* Non-veg indicator and title */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 border-2 border-red-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <h2 className="text-xl font-medium text-gray-800">{name}</h2>
          </div>

          {/* Price */}
          <div className="mb-2">
            <span className="text-lg font-medium">₹{currentPrice}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <img src={assets.rating_starts} alt="rating" />
            <span className="text-gray-500 text-sm">(156)</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4">{description}</p>

          {/* Sizes */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quantity.map((q) => (
              <button
                key={q.size}
                onClick={() => handleSizeChange(q.size)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedSize === q.size
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-red-600 hover:text-white transition-colors`}
                aria-label={`Select ${q.size}`}
              >
                {q.size}
              </button>
            ))}
          </div>
        </div>

        {/* Image and Add button container */}
        <div className="flex flex-col items-end gap-2">
          <div className="relative w-32 h-48">
            <img
              src={`${url}/${image}`}
              alt={name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {!cartItems[id] ? (
            <button
              onClick={() => addToCart(id, selectedSize, currentPrice)}
              className="bg-red-100 text-red-600 border border-red-700 font-bold px-8 py-2 rounded-md"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-red-500 gap-2 border border-red-600 rounded-md p-1">
              <button
                className="h-8 w-8 flex items-center justify-center text-white hover:bg-red-500 font-bold"
                onClick={() => removeFromCart(id)}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold text-white">
                {cartItems[id].quantity}
              </span>
              <button
                className="h-8 w-8 flex items-center justify-center text-white hover:bg-red-500 font-bold"
                onClick={() => addToCart(id, selectedSize, currentPrice)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
