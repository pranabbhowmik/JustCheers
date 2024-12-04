import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "animate.css";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [selectedTip, setSelectedTip] = useState(null); // Selected tip amount
  const [form, setForm] = useState({
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const tipOptions = [20, 30, 50, 60]; // Tip options

  const handleTipSelect = (amount) => {
    if (selectedTip === amount) {
      setSelectedTip(null); // Deselect if clicked twice
    } else {
      setSelectedTip(amount); // Select new tip
    }
  };

  const handleProceedToPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPayment(true);
    }, 3000); // Simulates a 3-second loading delay
  };
  const handleBuyNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/orderdone"); // Navigate to order done page
    }, 3000); // Delay of 3 seconds
  };

  const handelform = (e) => {
    e.preventDefault();
    console.log(form);
  };

  useEffect(() => {
    setForm({
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
  }, []);

  return (
    <>
      <form
        className="flex flex-col lg:flex-row lg:gap-12 mt-12 px-4"
        onSubmit={handelform}
      >
        {/* Left Section: Delivery Information */}
        <div className="w-full lg:w-1/2">
          <p className="text-2xl font-semibold text-gray-800 mb-8">
            Delivery Information
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                required
                name="firstName"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
              />
              <input
                required
                name="lastName"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
              />
            </div>
            <input
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <input
              required
              name="street"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              type="text"
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
            <div className="flex gap-4">
              <input
                required
                name="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
              />
              <input
                required
                name="state"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                type="text"
                placeholder="State"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
              />
            </div>
            <div className="flex gap-4">
              <input
                required
                name="zipCode"
                value={form.zipCode}
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                type="text"
                placeholder="Zip code"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
              />
              <input
                required
                name="landmark"
                value={form.landmark}
                onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                type="text"
                placeholder="Landmark"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
              />
            </div>
            <input
              required
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-tomato"
            />
          </div>
        </div>
        <br />
        {/* Right Section: Tips & Bill Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Tip Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="space-y-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Say thanks with a Tip!
              </h2>
              <p className="text-sm text-gray-600">
                Day & night, our delivery partners bring your favourite meals.
                Thank them with a tip.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tipOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleTipSelect(amount)}
                  className={`py-2 px-4 rounded-md border transition-colors w-[22%]
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

          {/* Bill Details Section */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Bill Details
            </h2>
            <div className="space-y-3 text-gray-600 text-sm">
              {/* Code for bill details */}
            </div>
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
                You save ₹{10}
              </div>
            </div>
          </div>

          <button
            className="w-full bg-red-500 text-white rounded-lg p-2 mt-4"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </form>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-red-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {showPayment && (
        <div
          className={`fixed bottom-0 left-0 w-full lg:w-1/3 lg:right-0 lg:left-auto bg-white shadow-lg p-4 transition-transform transform ${
            showPayment ? "translate-y-0" : "translate-y-full"
          } z-50`}
          style={{ transition: "transform 0.4s duration-700 ease-in-out" }}
        >
          <div className="flex justify-between items-center gap-10">
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
            <X
              className="w-10 h-6 -mt-4 cursor-pointer"
              onClick={() => setShowPayment(false)}
            />
          </div>

          <ul className="space-y-2">
            <li>
              <button className="w-full bg-gray-100 p-2 hover:bg-red-500 hover:text-white delay-150 rounded-lg">
                Credit Card
              </button>
            </li>
            <li className="flex justify-center items-center h-full">
              <button className="w-full max-w-sm bg-gray-100 p-2 hover:bg-red-500 hover:text-white delay-150 rounded-lg flex items-center gap-2  flex-row justify-center">
                <FaGooglePay className="w-8 h-8" />
                <SiPhonepe className="w-5 h-5" />
                <span className="text-center">UPI</span>
              </button>
            </li>

            <li>
              <button className="w-full bg-gray-100 p-2 hover:bg-red-500 hover:text-white delay-150 rounded-lg">
                Cash on Delivery
              </button>
            </li>
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">
              Total: ₹
              {(
                getTotalCartAmount() +
                25 +
                (selectedTip || 0) -
                5 +
                getTotalCartAmount() * 0.03
              ).toFixed(2)}
            </span>

            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
