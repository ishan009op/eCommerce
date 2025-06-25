import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [Name,setName]=useState('')
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [Role,setRole]=useState('')
const navigate=useNavigate()
    const register = async()=>{

        if (!Name || !Email || !Password || !Role) {
  alert("Please fill all fields.");
  return;
}

        await axios.post('http://localhost:3000/register',({
            name:Name,
            email:Email,
            password:Password,
            role:Role
        }))

        navigate('/login')
    }

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={Name}
          placeholder="Enter your name"
          type="text"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

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


     
      <div>
  <label className="block mb-1 font-medium">Role</label>
  <div className="flex gap-4">
    <label>
      <input
        type="radio"
        name="role"
        value="consumer"
        checked={Role === "consumer"}
        onChange={(e) => setRole(e.target.value)}
      />
      <span className="ml-1">Consumer</span>
    </label>

    <label>
      <input
        type="radio"
        name="role"
        value="seller"
        checked={Role === "seller"}
        onChange={(e) => setRole(e.target.value)}
      />
      <span className="ml-1">Seller</span>
    </label>
  </div>
</div>


      <button
        onClick={register}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        register
      </button>
      already have a account? <Link to='/login'>login</Link>
    </div>
    </>
  )
}

export default Register