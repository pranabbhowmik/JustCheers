import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status >= 200 && response.status < 300) {
        setList(response.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };
  const removeFood = async (drinkId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, null, {
        params: { id: drinkId },
      }); // Fixed params position
      await fetchList();
      if (response.status >= 200 && response.status < 300) {
        toast.success("Food removed successfully");
      } else {
        toast.error("Failed to remove food");
      }
    } catch (error) {
      console.error("Error in removeFood:", error);
      toast.error("Error occurred while removing food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      <p className="text-xl font-bold">All Drinks List</p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-4 rounded-lg shadow-md bg-white"
          >
            <img
              src={`${url}/` + item.image}
              alt={item.name}
              className="w-24 h-36 rounded object-cover"
            />
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.category}</p>

              <p className="text-gray-500 text-sm">{item.description}</p>
              <hr className=" bg-gray-200" />
              <div className="flex flex-col gap-1">
                {item.quantity.map((size, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p>{size.size}</p>
                    <p>₹{size.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex self-stretch sm:self-auto">
              <button
                title="Remove Drink"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFood(item._id)}
              >
                <AiFillDelete size={28} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
