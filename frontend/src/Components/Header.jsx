import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        iStore
      </Link>

      {/* Right Side Nav */}
      <div className="flex items-center gap-4">
        {/* Seller Only */}
        {user?.role === "seller" && (
          <Link to="/add" className="hidden md:inline-block text-sm font-medium hover:text-blue-600">
            Add Product
          </Link>
        )}

        {/* Auth Links */}
        {!user ? (
          <>
            <Link to="/register" className="hidden md:inline-block text-sm font-medium hover:text-blue-600">
              Register
            </Link>
            <Link to="/login" className="hidden md:inline-block text-sm font-medium hover:text-blue-600">
              Login
            </Link>
          </>
        ) : (
          <>
            {/* Username */}
            <span className="hidden md:inline-block text-sm text-gray-800">Hello, {user.name}</span>

            {/* Hamburger for mobile */}
            <button
              className="material-symbols-outlined text-3xl md:hidden text-gray-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              dehaze
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-4 items-center text-sm">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to={`/cart/${user._id}`} className="hover:text-blue-600">Cart</Link>
              <Link to={`/orders/${user._id}`} className="hover:text-blue-600">Order History</Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-500"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && user && (
        <div className="absolute top-16 right-4 bg-gray-900 text-white rounded-md p-4 flex flex-col gap-3 md:hidden shadow-lg animate-slide-in z-50">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Home</Link>
          <Link to={`/cart/${user._id}`} onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Cart</Link>
        
          <Link to={`/orders/${user._id}`} onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Order History</Link>
          {user?.role === "seller" && (
  <Link to="/add" onClick={() => setMenuOpen(false)} className="text-sm font-medium hover:text-blue-400">
    Add Product
  </Link>
)}

          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:text-red-400">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
