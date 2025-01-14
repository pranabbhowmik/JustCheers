import React, { useState } from "react";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([{ size: "", price: "" }]);
  const [form, setFrom] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    quantity: [],
  });

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", price: "" }]);
  };

  const handleRemoveSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("image", image);
    formData.append("quantity", JSON.stringify(sizes)); // Convert sizes array to JSON string

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        // Clear form state
        setFrom({
          name: "",
          description: "",
          category: "",
        });
        setImage(null);
        setSizes([{ size: "", price: "" }]);

        // Show success toast
        toast.success("Product added successfully");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product");
    }
  };

  return (
    <div className="w-full px-4 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto mt-12 text-gray-600 text-base">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          <p className="mb-2">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-30 rounded-md"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            hidden
          />
        </div>

        <div className="flex flex-col w-full max-w-sm">
          <p className="mb-2">Product name</p>
          <input
            onChange={(e) => setFrom({ ...form, name: e.target.value })}
            type="text"
            name="name"
            placeholder="Type here"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-col w-full max-w-sm">
          <p className="mb-2">Product description</p>
          <textarea
            onChange={(e) => setFrom({ ...form, description: e.target.value })}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          ></textarea>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col w-full max-w-xs">
            <p className="mb-2">Product category</p>
            <select
              onChange={(e) => setFrom({ ...form, category: e.target.value })}
              name="category"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Rum">Rum</option>
              <option value="Vodka">Vodka</option>
              <option value="Whisky">Whisky</option>
              <option value="Beer">Beer</option>
              <option value="Wine">Wine</option>
              <option value="Brandy">Brandy</option>
              <option value="Tequila">Tequila</option>
              <option value="Gin">Gin</option>
              <option value="Desi">Desi</option>
              <option value="Soft Drinks">Soft Drinks</option>
              <option value="Cigarette">Cigarette</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="mb-2">Size and Price</p>
          {sizes.map((item, index) => (
            <div key={index} className="flex flex-wrap items-center gap-4">
              <input
                type="text"
                name={`size-${index}`}
                placeholder="Size (e.g., 180ml)"
                value={item.size}
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full max-w-[150px]"
              />
              <input
                type="number"
                name={`price-${index}`}
                placeholder="Price (₹900)"
                value={item.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full max-w-[150px]"
              />
              <button
                type="button"
                onClick={() => handleRemoveSize(index)}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSize}
            className="w-30 sm:w-30 p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
          >
            Add Size
          </button>
        </div>

        <button
          type="submit"
          className="w-30 p-2 bg-green-500 hover:bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 lg:w-24"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
