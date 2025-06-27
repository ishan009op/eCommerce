import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Cart = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate= useNavigate()
  const[data,setData]=useState([])
useEffect(()=>{
const fetchCart=async()=>{
  const res=await  axios.get(`http://localhost:3000/cart/${user._id}`)
const data=await res.data
  setData(data.products);
}
fetchCart()
},[])

console.log(data);


const shop = () => {
    
    navigate(`/checkout`);
  };

  return (
    <>
    <div>
      {
data.map((product)=>{
return < div key={product._id}>
  {product.totalAmount}
 <img src={product.image} alt={product.title} className='w-full h-48 object-cover mb-2' />
            <h2 className='text-lg font-semibold'>{product.title}</h2>
            <p className='text-gray-600'>₹{product.price}</p>
{/* <Link to={`/product/${product._id}`}>view more</Link> */}

</div>
    
})}
  </div>
  <button onClick={shop}>Shop now</button>
  </>
)
}

export default Cart