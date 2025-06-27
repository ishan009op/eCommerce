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
    navigate("/"); // redirect unauthorized users
  }
}, []);


  const add = async () => {

     if (!Title || !Desc || !Price || !Image|| Category) {
  alert("Please fill all fields.");
  return;
     }
    await axios.post('http://localhost:3000/products', {
      title: Title,
      description: Desc,
      price: Price,
      image: Image,
      category: Category,
    });

    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={Title}
          placeholder="Enter title of your product"
          type="text"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={Desc}
          placeholder="Enter description of your product"
          type="text"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={Price}
          placeholder="Enter price"
          type="number"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          onChange={(e) => SetImage(e.target.value)}
          value={Image}
          placeholder="Enter image URL"
          type="url"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={Category}
          placeholder="Enter category"
          type="text"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={add}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
