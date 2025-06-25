import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Product = () => {
   const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate()
  const [data, setData] = useState(null);
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

  const handledelete=async ()=>{

    const confirmed = window.confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;
await axios.delete(`http://localhost:3000/products/${id}`)

navigate('/')
  }
  const shop=()=>{
    alert("purchase complete")
    navigate('/product/:id')
  }

console.log(data)
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow"> 
      <img src={data.image} alt={data.title} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-700 mb-2">{data.description}</p>
      <p className="text-xl font-semibold text-green-600">₹{data.price}</p>

      <button onClick={shop}>shop now</button>

      {user?.role === "seller" && (
      <>
       {/* <Link to="/add" className="hover:underline">Add Product</Link> */}
      <Link to={`/edit/${id}`}>edit</Link>
      <button onClick={handledelete}>Delete</button>
      </>
      )}
    </div>
  );
};

export default Product;
