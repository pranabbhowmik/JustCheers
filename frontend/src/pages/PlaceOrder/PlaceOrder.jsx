import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "animate.css";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, url, food_list, cartItems } =
    useContext(StoreContext);
  const [selectedTip, setSelectedTip] = useState(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    landmark: "",
    phone: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const tipOptions = [20, 30, 50, 60];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleTipSelect = (amount) => {
  //   setSelectedTip((prev) => (prev === amount ? null : amount));
  // };

  const handeladdress = async () => {
    if (!data.zipCode) return;

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${data.zipCode}`
      );
      if (response.data[0].Status === "Success") {
        const location = response.data[0].PostOffice[0];
        setData((prevData) => ({
          ...prevData,
          city: location.District,
          state: location.State,
          street:
            location.Name +
            ", " +
            location.Division +
            ", " +
            location.District +
            ", " +
            location.State,
        }));
      } else {
        toast.error("Input Currect Pincode");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter((item) => cartItems[item._id])
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id].quantity,
        size: cartItems[item._id].size,
        price: cartItems[item._id].price,
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount:
        getTotalCartAmount() +
        25 +
        (selectedTip || 0) +
        5 +
        getTotalCartAmount() * 0.03,
    };

    try {
      const response = await axios.post(
        `${url}/api/order/placeorder`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Order failed");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const handleBuyNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/orderdone");
    }, 3000);
  };

  return (
    <form
      className="flex flex-col lg:flex-row lg:gap-12 mt-12 px-4"
      onSubmit={placeOrder}
    >
      {/* Delivery Information */}
      <div className="w-full lg:w-1/2">
        <p className="text-2xl font-semibold text-gray-800 mb-8">
          Delivery Information
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              required
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              autoComplete="off"
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <input
              required
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
          </div>
          <input
            required
            name="email"
            onChange={handleChange}
            value={data.email}
            autoComplete="off"
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
          />
          <input
            required
            name="street"
            onChange={handleChange}
            value={data.street}
            type="text"
            placeholder="Street Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
          />
          <div className="flex gap-4">
            <input
              required
              name="city"
              onChange={handleChange}
              value={data.city}
              type="text"
              placeholder="City"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <input
              required
              name="state"
              onChange={handleChange}
              value={data.state}
              type="text"
              placeholder="State"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
          </div>
          <div className="flex gap-4">
            <input
              required
              name="zipCode"
              onChange={handleChange}
              value={data.zipCode}
              onBlur={handeladdress}
              placeholder="Pin code"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <input
              required
              name="landmark"
              onChange={handleChange}
              value={data.landmark}
              type="text"
              placeholder="Landmark"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
          </div>
          <input
            required
            name="phone"
            onChange={handleChange}
            value={data.phone}
            type="text"
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
          />
        </div>
      </div>

      {/* Tips & Bill Details */}
      <div className="w-full mt-5 sm:mt-0 lg:w-1/2 flex flex-col gap-6">
        {/* Conditionally render the bill section */}
        {getTotalCartAmount() > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Bill Details
            </h2>
            <div className="text-gray-600 text-sm space-y-2">
              <div>Total Amount: ₹{getTotalCartAmount()}</div>
              <div>Delivery Charges: ₹25</div>
              <div>Tip: ₹{selectedTip || 0}</div>
              <div>Tax: ₹{(getTotalCartAmount() * 0.03).toFixed(2)}</div>
              <div>Discount: ₹5</div>
            </div>
            <div className="mt-4 border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 line-through text-sm">
                  ₹
                  {(
                    getTotalCartAmount() +
                    25 +
                    (selectedTip || 0) +
                    getTotalCartAmount() * 0.03
                  ).toFixed(2)}
                </span>
                <span className="font-bold text-xl text-gray-800">
                  ₹
                  {(
                    getTotalCartAmount() +
                    25 +
                    (selectedTip || 0) -
                    5 +
                    getTotalCartAmount() * 0.03
                  ).toFixed(2)}
                </span>
              </div>
              <div className="text-green-500 text-sm font-medium">
                You save ₹10
              </div>
            </div>
          </div>
        )}

        {/* Place Order button */}
        {getTotalCartAmount() > 0 && (
          <button
            className="w-full bg-red-500 text-white rounded-lg p-2 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        )}
      </div>
    </form>
  );
};

export default PlaceOrder;
