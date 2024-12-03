import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";
const SearchInput = () => {
  const { food_list } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter food items based on the search query
  const filteredFoodItems = food_list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <div>
        {filteredFoodItems.length > 0 ? (
          filteredFoodItems.map((item) => (
            <FoodItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
