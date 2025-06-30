import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [Title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');
  const [Price, setPrice] = useState('');
  const [Image, SetImage] = useState('');
  const [Category, setCategory] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "seller") {
      navigate('/');
    }
  }, [navigate]);

  const add = async () => {
    if (!Title || !Desc || !Price || !Image || !Category) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/products', {
        title: Title,
        description: Desc,
        price: Price,
        image: Image,
        category: Category,
      });

      navigate('/');
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong while adding the product.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md space-y-5">
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter product description"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            value={Image}
            onChange={(e) => SetImage(e.target.value)}
            placeholder="Enter image URL"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product category"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <button
          onClick={add}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
