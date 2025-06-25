import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
const Home = () => {

    const[data,setData]=useState([])

    useEffect(()=>{
const fetchdata=async()=>{
    const res= await axios.get('http://localhost:3000/products')
  setData(res.data)
}

fetchdata()
    },[])
// console.log(data)
  return (
   <>
    <div className='grid grid-cols-3 gap-4 p-4'>
        {data.map((product) => (
          <div key={product._id} className='border p-4 rounded shadow'>
            <img src={product.image} alt={product.title} className='w-full h-48 object-cover mb-2' />
            <h2 className='text-lg font-semibold'>{product.title}</h2>
            <p className='text-gray-600'>₹{product.price}</p>
<Link to={`/product/${product._id}`}>view more</Link>
          </div>
        ))}
          </div>
   </>
  )
}

export default Home