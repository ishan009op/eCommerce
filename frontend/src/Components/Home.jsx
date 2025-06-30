import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get('http://localhost:3000/products');
      setData(res.data);
    };
    fetchdata();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl shadow hover:shadow-lg p-4 flex flex-col transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-3"
            />

            <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
            <p className="text-gray-600 font-medium my-1">₹{product.price}</p>

            <Link
              to={`/product/${product._id}`}
              className="mt-auto text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-center transition"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
