import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between gap-6">
        
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold mb-2">MyStore</h2>
          <p className="text-sm text-gray-300">Your trusted online shopping partner.</p>
        </div>

        <p>designed by: developer_ishan09</p>
      

        {/* Contact or Policies */}
        <div className="text-sm text-gray-400">
          <p>Email: support@mystore.com</p>
          <p>Cash on Delivery Only</p>
          <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
