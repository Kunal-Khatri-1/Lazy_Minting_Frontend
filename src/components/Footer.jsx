import React from "react";
import { Link } from "react-router-dom";

import { FaTwitter, FaInstagram, FaDiscord, FaReddit } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 h-[300px] m-auto flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-4">Sign up for updates</h3>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-white text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none">
                Sign up
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div>
              <h3 className="text-lg font-bold mb-4">Hang Out With Us</h3>
            </div>
            <div className="flex mt-4 md:mt-0">
              <Link to="/" className="mr-4" />
              <FaTwitter className="text-2xl cursor-pointer" />

              <Link to="/" className="mr-4" />
              <FaInstagram className="text-2xl cursor-pointer" />

              <Link to="/" className="mr-4" />
              <FaDiscord className="text-2xl cursor-pointer" />

              <Link to="/" className="mr-4" />
              <FaReddit className="text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
