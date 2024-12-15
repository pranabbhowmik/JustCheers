import React from "react";
import { assets } from "../../assets/assets.js";

const Navber = () => {
  return (
    <div className="flex justify-between items-center p-4 md:px-16">
      <img className="w-28 md:w-28" src={assets.logo} alt="Logo" />
      <img
        className="w-10 md:w-12 rounded-full"
        src={assets.profile_image}
        alt="Profile"
      />
    </div>
  );
};

export default Navber;
