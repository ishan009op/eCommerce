import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    if (!Name || !Email || !Password || !Role) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/register', {
        name: Name,
        email: Email,
        password: Password,
        role: Role,
        address: Address,
        phone: Phone,
      });

      navigate('/login');
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong during registration.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full my-5 max-w-md bg-white p-6 rounded shadow-md space-y-5">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="consumer"
                checked={Role === "consumer"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="ml-2">Consumer</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={Role === "seller"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="ml-2">Seller</span>
            </label>
          </div>
        </div>

        <button
          onClick={register}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
