import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');
  const [Price, setPrice] = useState('');
  const [Image, setImage] = useState('');
  const [Category, setCategory] = useState('');

  // ✅ Redirect if not seller
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "seller") {
      navigate("/");
    }
  }, []);

  // ✅ Prefill data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        const product = res.data;
        setTitle(product.title);
        setDesc(product.description);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const edit = async () => {
    if (!Title || !Desc || !Price || !Image || !Category) {
      alert("Please fill all fields.");
      return;
    }

    await axios.put(`http://localhost:3000/products/${id}`, {
      title: Title,
      description: Desc,
      price: Price,
      image: Image,
      category: Category,
    });

    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded space-y-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

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
          onChange={(e) => setImage(e.target.value)}
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
        onClick={edit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Edit;
