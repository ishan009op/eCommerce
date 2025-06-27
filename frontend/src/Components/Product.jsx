import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Product = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [num, setnum] = useState(1);
  const { id, } = useParams();

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

  const shop = () => {
    
    navigate(`/checkout`);
  };

  const goBack = () => {
    navigate(-1);
  };

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



  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow">
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <img src={data.image} alt={data.title} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-700 mb-2">{data.description}</p>
      <p className="text-xl font-semibold text-green-600">₹{data.price}</p>
<input type="number" min='1' onChange={(e)=>{setnum(Number(e.target.value))}} value={num} />
      <button
        onClick={shop}
        className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Shop Now
      </button>
      <button
      onClick={handleAddToCart}
        className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

      {user?.role === "seller" && (
        <div className="flex gap-4 mt-2">
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
  );
};

export default Product;
