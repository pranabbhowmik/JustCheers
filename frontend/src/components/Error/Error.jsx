import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/error.json";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigates to the home route
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="sm:w-1/2 ">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleGoHome}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all  hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md w-full max-w-sm"
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
