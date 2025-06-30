import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [user._id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  return (
    <div className="w-full min-w-[320px] max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow p-4 bg-white w-full"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="w-full sm:w-auto px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              </div>

              {/* Product List */}
              <ul className="flex flex-col gap-4">
                {order.products.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-start gap-4 border-t pt-4"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-full sm:w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-base">{item.productId.title}</h4>
                      <p className="text-sm text-gray-600">{item.productId.description}</p>
                      <p className="text-sm mt-1">Price: ₹{item.productId.price}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
