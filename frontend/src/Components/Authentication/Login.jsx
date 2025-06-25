import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
  
const navigate=useNavigate()
    const login = async()=>{

         if (!Email || !Password) {
    alert("Please enter both email and password.");
    return;
  }
      const res=  await axios.post('http://localhost:3000/login',({
            
            email:Email,
            password:Password,
           
        }))

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate('/')
    }

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">login</h2>

     

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          placeholder="Enter your email"
          type="email"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
          placeholder="Enter password"
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
      </div>


     
      
      <button
        onClick={login}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        login
      </button>
      don't have a account? <Link to='/register'>register</Link>
    </div>
    </>
  )
}

export default Login