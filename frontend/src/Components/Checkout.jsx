import React,{useEffect,useState} from 'react'
import axios from 'axios'
const Checkout = () => {
const[data,setData]=useState([])

const user = JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
    const fetchCart=async()=>{
      const res=await  axios.get(`http://localhost:3000/cart/${user._id}`)
    const data=await res.data
      setData(data);
    }
    fetchCart()
    },[])

    console.log(data)
    const order=async()=>{
await axios.post('http://localhost:3000/order',({
     userId: user._id,
      products: [
        {
         productId:id,
    title: data.title,
    price: data.price,
    image: data.image
        },
      ],
}))

    }
  return (
    <>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perspiciatis.
    </>
  )
}

export default Checkout