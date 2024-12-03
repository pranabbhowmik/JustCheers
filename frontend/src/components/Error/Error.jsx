import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/error.json";

const Error = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="sm:w-1/2 ">
        <Lottie animationData={animation} loop={true} />
      </div>
    </div>
  );
};

export default Error;
