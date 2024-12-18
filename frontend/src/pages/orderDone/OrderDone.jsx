import React, { useContext, useEffect } from "react";
import Lottie from "lottie-react";
import { MdViewList } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import orderdonr from "../../assets/orderDone.json";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const OrderDone = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const url = "https://just-cheers-backend.onrender.com";

  // payment verification
  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`, {
      orderId,
      success,
    });
    if (response.data.success) {
      console.log("Payment Successful");
    } else {
      console.log("Payment Failed");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 -mt-10 sm:px-6 lg:px-8">
      {/* Animation */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <Lottie animationData={orderdonr} loop={true} size={20} />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold font-robotoMono text-gray-900 text-center sm:text-3xl lg:text-4xl mb-2">
        Thank you for ordering!
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-center text-sm sm:text-base lg:text-lg mb-6 font-robotoMono font-bold">
        Your Order Has Been Placed Successfully. Within 20 minutes, you will get
        your order at your doorstep.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-md">
        {/* View Order Button */}
        <button
          className="relative w-full flex h-14 items-center justify-center overflow-hidden font-medium rounded-3xl transition-all bg-white hover:bg-white group py-2 px-6 border border-gray-300"
          onClick={() => navigate("/myorder")}
        >
          {/* Hover Background */}
          <span className="absolute inset-0 bg-red-500 transition-transform duration-500 transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"></span>
          {/* Icon and Text */}
          <span className="relative flex items-center gap-2 font-semibold text-black transition-colors duration-300 group-hover:text-white">
            <MdViewList className="text-xl sm:text-2xl" />
            VIEW ORDER
          </span>
        </button>

        {/* Continue Shopping Button */}
        <button
          className="relative flex h-14 w-full items-center justify-center overflow-hidden font-medium rounded-3xl transition-all bg-white hover:bg-white group py-2 px-6 border border-gray-300"
          onClick={() => navigate("/")}
        >
          {/* Hover Background */}
          <span className="absolute inset-0  bg-red-500 transition-transform duration-500 transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"></span>
          {/* Icon and Text */}
          <span className="relative flex items-center gap-2 font-semibold text-black transition-colors duration-300 group-hover:text-white">
            <FaShoppingBag className="text-xl sm:text-2xl" />
            CONTINUE SHOPPING
          </span>
        </button>
      </div>
    </div>
  );
};

export default OrderDone;
