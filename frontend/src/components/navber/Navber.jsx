import { useContext, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaHome, FaWallet, FaCog, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { StoreContext } from "../../context/StoreContext";
export default function Navbar({ setShowLoginPopup }) {
  const { cartItems } = useContext(StoreContext);
  const cartItemsCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="border-b pt-1 sm:pt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-2">
                <img src={logo} alt="logo" className="sm:w-44 w-32" />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative text-gray-900 hover:text-gray-600 transition-all ${
                    isActive
                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-red-500"
                      : "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `relative text-gray-900 hover:text-gray-600 transition-all ${
                    isActive
                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-red-500"
                      : "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full"
                  }`
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="/mobile-app"
                className={({ isActive }) =>
                  `relative text-gray-900 hover:text-gray-600 transition-all ${
                    isActive
                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-red-500"
                      : "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full"
                  }`
                }
              >
                Mobile-app
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative text-gray-900 hover:text-gray-600 transition-all ${
                    isActive
                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-red-500"
                      : "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full"
                  }`
                }
              >
                Contact us
              </NavLink>
            </div>

            {/* Right Side Icons */}
            <div className=" md:flex items-center space-x-4">
              <button
                className="px-6 py-2  text-red-600 border border-[#ff4533] rounded-full hover:bg-red-600 hover:text-white transition-colors"
                onClick={() => setShowLoginPopup(true)}
              >
                sign in
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile View */}
      <div className="md:hidden  fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 text-gray-600 ">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <NavLink
            to={"/"}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5  hover:bg-red-500 hover:text-white group"
          >
            <FaHome className="w-5 h-5 mb-2" />
            <span className="text-sm">Home</span>
          </NavLink>

          <NavLink
            to={"/search"}
            type="button"
            className="inline-flex flex-col hover:bg-red-500 hover:text-white items-center justify-center px-5 group"
          >
            <Search className="w-5 h-5 mb-2" />
            <span className="text-sm">Search</span>
          </NavLink>

          <NavLink
            to="/cart"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-red-500 hover:text-white "
          >
            {cartItemsCount > 0 && (
              <span className="font-robotoMono w-3 h-3 ml-9 font-bold">
                {cartItemsCount}
              </span>
            )}
            <ShoppingBag className="w-5 h-5 mb-2" />
            <span className="text-sm">Cart</span>
          </NavLink>

          <NavLink
            type="button"
            to="/profile"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-red-500 hover:text-white group"
          >
            <FaUserCircle className="w-5 h-5 mb-2" />
            <span className="text-sm">Profile</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
