import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="px-2 py-2 md:px-8 lg:px-16" id="explore-menu">
      <h1 className="text-2xl md:text-4xl font-bold text-black mb-4">
        Explore our menu
      </h1>
      <p className="text-gray-600 mb-8">
        Just Cheers redefines convenience with 20-minute alcohol delivery.
        Explore premium beverages, unbeatable speed, and unmatched
        service—bringing celebrations right to your doorstep. Cheers, instantly!
      </p>
      <div className="explore-menu-list flex overflow-x-auto space-x-6 sm:space-x-12 scrollbar-hide pb-4">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className="flex-shrink-0 text-center cursor-pointer"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border border-gray-300 ${
                category === item.menu_name
                  ? "ring-2 ring-red-500 scale-90"
                  : ""
              }`}
            />
            <p className="text-gray-700 mt-3 text-sm md:text-base">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="mt-6 border-gray-300" />
    </div>
  );
};

export default ExploreMenu;
