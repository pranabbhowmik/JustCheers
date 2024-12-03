import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header rounded">
      <div className="header-contents">
        <h2>Order Your drinks here</h2>
        <p className="lg:block hidden">
          Choose a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
