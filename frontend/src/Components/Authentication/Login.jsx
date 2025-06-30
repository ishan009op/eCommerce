import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    if (!Email || !Password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/login', {
        email: Email,
        password: Password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (error) {
      alert('Invalid credentials or server error.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md space-y-5">
        <h2 className="text-2xl font-bold text-center">Login</h2>

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
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
