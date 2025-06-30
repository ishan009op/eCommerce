import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [amount, setAmount] = useState(0);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cart/${user._id}`);
        setData(res.data.products);

        const initialQuantities = {};
        res.data.products.forEach((p) => {
          initialQuantities[p.productId] = p.quantity || 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [user._id]);

  useEffect(() => {
    let total = 0;
    data.forEach((p) => {
      const qty = quantities[p.productId] || 1;
      total += p.price * qty;
    });
    setAmount(total);
  }, [quantities, data]);

  const handleQuantityChange = (productId, newQty) => {
    if (newQty >= 1 && newQty <= 10) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQty,
      }));
    }
  };

  const handleRemove = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to remove?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/cart/product/${productId}`, {
        data: { userId: user._id }
      });

      const updatedCart = await axios.get(`http://localhost:3000/cart/${user._id}`);
      setData(updatedCart.data.products);
    } catch (err) {
      console.error('Error removing product:', err);
    }
  };

  const shop = async () => {
    const orderProducts = data.map((p) => ({
      productId: p.productId,
      title: p.title,
      price: p.price,
      image: p.image,
      quantity: quantities[p.productId] || 1,
    }));

    try {
      await axios.post("http://localhost:3000/order", {
        userId: user._id,
        products: orderProducts,
        totalAmount: amount,
      });

      alert("Order placed successfully!");
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    try {
      setUpdatingId(productId);
      await axios.put(`http://localhost:3000/cart/product/${productId}`, {
        userId: user._id,
        quantity: newQuantity
      });

      const updatedCart = await axios.get(`http://localhost:3000/cart/${user._id}`);
      setData(updatedCart.data.products);
    } catch (err) {
      console.error('Error updating quantity:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
          {data.map((product) => (
            <div
              key={product.productId}
              className="flex flex-col sm:flex-row gap-4 border p-4 rounded shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full sm:w-32 h-32 object-cover rounded"
              />
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-700">₹{product.price}</p>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={quantities[product.productId] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.productId, Number(e.target.value))
                    }
                    className="w-20 border px-2 py-1 rounded"
                  />
                  <button
                    disabled={updatingId === product.productId}
                    onClick={() =>
                      updateCartQuantity(
                        product.productId,
                        quantities[product.productId] || 1
                      )
                    }
                    className={`px-3 py-1 rounded text-white text-sm transition ${
                      updatingId === product.productId
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {updatingId === product.productId ? 'Updating...' : 'Update'}
                  </button>

                  <button
                    onClick={() => handleRemove(product.productId)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Footer section */}
          <div className="mt-6 p-4 border-t text-right space-y-2">
            <p className="text-lg font-semibold">Total Amount: ₹{amount}</p>
            <p className="text-sm text-gray-600">Payment method: Cash on delivery only</p>
            <button
              onClick={shop}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
