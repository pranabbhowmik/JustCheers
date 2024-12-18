import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";

const Order = ({ url }) => {
  const [data, setData] = useState([]); // Initialize as an empty array

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/listorders`);

      // Ensure response.data is an array or extract the array property
      const orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      setData(orders || []); // Fallback to empty array if orders is undefined
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatus = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchOrders();
      toast.success("Order status updated successfully");
    } else {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div className="space-y-6">
        {Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((order, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-6 p-4 border border-red-400 rounded-md text-sm text-gray-700"
              >
                <img
                  src={assets.parcel_icon}
                  alt={order.items[0]?.name || "Order Image"}
                  className="w-32 h-28 object-cover rounded-md sm:w-32 sm:h-28 mx-auto"
                />
                <div>
                  <p className="font-semibold mb-2">
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.name} x {item.quantity}
                        {idx !== order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="font-semibold mb-1">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="mb-2">
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state},
                      {order.address.country}, {order.address.zipCode}
                    </p>
                  </div>
                  <p className="font-semibold">
                    Phone No- {order.address.phone}
                  </p>
                </div>
                <p className="text-center">Total-Items: {order.items.length}</p>
                <p className="text-center">₹{order.amount}</p>
                <select
                  onChange={(event) => updateStatus(event, order._id)}
                  value={order.status}
                  className="bg-red-500 text-white border border-red-500 rounded-md p-2 w-full sm:w-32 outline-none"
                >
                  <option value="Order accepted">Order accepted</option>
                  <option value="Picked Up by Delivery Boy">
                    Picked Up by Delivery Boy
                  </option>
                  <option value="Delivery in Progress">
                    Delivery in Progress
                  </option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
