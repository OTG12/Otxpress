import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#2e2e2e] text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-yellow-400">
          OTXpress
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/track" className="hover:text-yellow-400">Track</Link>
          <Link to="/bookdelivery" className="hover:text-yellow-400">Book Delivery</Link>
          <Link to="/pricing" className="hover:text-yellow-400">Pricing</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 text-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-500 hover:text-black text-sm"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 fill-current text-white"
            viewBox="0 0 20 20"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#2e2e2e] border-t border-gray-700">
          <nav className="flex flex-col gap-4 text-sm">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Home</Link>
            <Link to="/track" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Track</Link>
            <Link to="/bookdelivery" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Book Delivery</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Pricing</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Contact</Link>
            <hr className="border-gray-600" />
            <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Login</Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-yellow-400 font-semibold hover:text-yellow-300"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;


