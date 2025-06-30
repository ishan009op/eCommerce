import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Product = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [num, setnum] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetch();
  }, [id]);

  const handledelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    await axios.delete(`http://localhost:3000/products/${id}`);
    navigate('/');
  };

  const shop = async () => {
    const res = await axios.post("http://localhost:3000/order", {
      id,
      userId: user._id,
      products: [
        {
          productId: id,
          title: data.title,
          price: data.price,
          image: data.image,
          quantity: num,
        },
      ],
      totalAmount: data.price * num,
    });

    console.log(res);
  };

  const goBack = () => navigate(-1);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:3000/cart', {
        userId: user._id,
        products: [
          {
            productId: id,
            title: data.title,
            price: data.price,
            image: data.image,
            quantity: num,
          },
        ],
        totalAmount: data.price * num,
      });

      if (response.data.message === "Product already in cart") {
        alert("This product is already in your cart.");
      } else {
        navigate(`/cart/${user._id}`);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (!data) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="p-6 my-10 max-w-3xl mx-auto border rounded shadow-md bg-white">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={data.image}
          alt={data.title}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <p className="text-gray-700">{data.description}</p>
          <p className="text-xl font-semibold text-green-600">₹{data.price}</p>

          <label className="mt-2 text-sm font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={num}
            onChange={(e) => setnum(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded"
          />

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={shop}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Shop Now
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            <p>Payment method: <strong>Cash on delivery</strong></p>
            <p>Non-refundable</p>
          </div>

          {user?.role === "seller" && (
            <div className="flex gap-4 mt-4">
              <Link
                to={`/edit/${id}`}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={handledelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
