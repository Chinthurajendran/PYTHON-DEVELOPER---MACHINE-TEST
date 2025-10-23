import React from "react";
import { FaPenNib } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2 font-medium">
          <FaPenNib className="text-gray-500" />
          <span>CRUD &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="mt-2 sm:mt-0 text-xs text-gray-500">
          Crafted by <span className="font-semibold text-gray-700">Creative Minds</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
