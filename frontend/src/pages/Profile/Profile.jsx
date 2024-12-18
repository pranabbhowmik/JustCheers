import React, { useContext } from "react";
import { CreditCard } from "lucide-react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-rubik">
            Welcom to Just Cheers 🍻
          </h1>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-200  rounded-lg transition-colors">
          <div>
            <h2 className="text-gray-900 font-medium text-left hover:text-gray-500">
              My Account
            </h2>
            <p className="text-sm text-gray-600 hover:text-gray-500">
              Address & Settings
            </p>
          </div>

          <HiOutlineChevronRight className="h-5 w-5 text-gray-400 hover:text-gray-500" />
        </button>
        <button
          className="w-full flex items-center justify-between p-3 hover:bg-gray-200  rounded-lg transition-colors"
          onClick={() => navigate("/myorder")}
        >
          <div>
            <h2 className="text-gray-900 font-medium text-left hover:text-gray-500">
              Orders 🍺
            </h2>
            <p className="text-sm text-gray-600 hover:text-gray-500">
              Track your Orders
            </p>
          </div>

          <HiOutlineChevronRight className="h-5 w-5 text-gray-400 hover:text-gray-500" />
        </button>

        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-200 rounded-lg transition-colors">
          <div>
            <h2 className="text-gray-900 font-medium text-left hover:text-gray-500">
              Payments & Refunds
            </h2>
            <p className="text-sm text-gray-600 hover:text-gray-500">
              Manage your Refunds, Payment Modes
            </p>
          </div>
          <HiOutlineChevronRight className="h-5 w-5 text-gray-400 hover:text-gray-500" />
        </button>

        {/* Membership Section */}
        <div className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <CreditCard className="h-16 w-16 text-gray-400 hover:text-gray-500" />
            <div>
              <h2 className="text-gray-900 font-medium hover:text-gray-500">
                Membership
              </h2>
              <p className="text-sm text-gray-600 hover:text-gray-500">
                Unlock UNLIMITED Free Deliveries & Discount
              </p>
            </div>
          </div>
          <button className="bg-red-500 text-white text-xs font-rubik font-semibold px-3 py-1 rounded">
            BUY NOW
          </button>
        </div>

        {/* Help Section */}
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-200 rounded-lg transition-colors">
          <div>
            <h2 className="text-gray-900 font-medium text-left hover:text-gray-500">
              Help
            </h2>
            <p className="text-sm text-gray-600 hover:text-gray-500">
              FAQs & Links
            </p>
          </div>
          <HiOutlineChevronRight className="h-5 w-5 text-gray-400 hover:text-gray-500" />
        </button>

        {/* Logout Section */}
        <button
          className="w-full flex items-center justify-between p-3 hover:bg-gray-200 rounded-lg transition-colors"
          onClick={logout}
        >
          <h2 className="text-red-500 font-rubik hover:text-red-700 ">
            LOGOUT{" "}
          </h2>
          <HiOutlineChevronRight className="h-5 w-5 text-red-500 hover:text-red-800" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
