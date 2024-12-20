import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getMyOrders();
    }
  }, [token]);

  const LoadingSkeleton = () => (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="my-orders-order animate-pulse bg-gray-200 rounded-md p-4"
          >
            <div className="w-12 h-12 bg-gray-300 rounded"></div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-8 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-10 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <h4>Products:</h4>
                <ul>
                  {order.items &&
                    order.items.map((item, index) => (
                      <li key={index} className="product-detail">
                        {item.name} - Quantity: {item.quantity}, Size:{" "}
                        {item.size}
                      </li>
                    ))}
                </ul>
              </div>
              <p>₹{order.amount}.00</p>
              <p>Total items: {order.items.length}</p>
              <p>
                <span>&#x25cf; </span>
                <b>{order.status}</b>
              </p>
              <button
                onClick={getMyOrders}
                className="bg-gradient-to-r w-20 from-red-500 to-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-md relative group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity text-white"></span>
                Track Order
              </button>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
