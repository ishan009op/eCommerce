import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
     const confirmed = window.confirm("Are you sure you want to logout");
  if (!confirmed) return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
      <Link to="/" className="text-xl font-bold">MyStore</Link>

      <div className="flex gap-4 items-center">
        {user?.role === "seller" && (
          <Link to="/add-product" className="hover:underline">Add Product</Link>
        )}

        {!user ? (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hello, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
