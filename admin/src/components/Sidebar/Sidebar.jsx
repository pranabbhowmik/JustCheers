import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border border-gray-400 border-t-0 border-l-0 text-[max(1vw,10px)]">
      <div className="pt-12 pl-5 flex flex-col gap-5">
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-400 border-r-0 p-2.5 rounded-l-md cursor-pointer hover:bg-gray-100 hover:border-gray-300 ${
              isActive
                ? "bg-[rgb(194,189,189)] border-[rgba(255,99,71,0.288)]"
                : ""
            }`
          }
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-400 border-r-0 p-2.5 rounded-l-md cursor-pointer hover:bg-gray-100 hover:border-gray-300 ${
              isActive ? "bg-[#bcb5b3] border-[rgba(255,99,71,0.288)]" : ""
            }`
          }
        >
          <FaList className="w-24 h-8 sm:-ml-8" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-400 border-r-0 p-2.5 rounded-l-md cursor-pointer hover:bg-gray-100 hover:border-gray-300 ${
              isActive ? "bg-[#9c9a9a] border-[rgba(255,99,71,0.288)]" : ""
            }`
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
