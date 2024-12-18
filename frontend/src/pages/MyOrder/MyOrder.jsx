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
      console.log("API Response:", response.data); // Log the API response
      // Access the orders field from the response data
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

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Orders Data:", data); // Log the data after it's set

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items &&
                  order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        item.name + " x " + item.quantity + " x " + item.size
                      );
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
              </p>
              <p>₹{order.amount}.00</p>
              <p>items: {order.items.length}</p>
              <p>
                <span>&#x25cf; </span>
                <b>{order.status}</b>
              </p>
              <button onClick={getMyOrders}>Track Order</button>
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
