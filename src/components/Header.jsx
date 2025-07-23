import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpeg"; // make sure this path is correct

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center h-16">
        {/* Logo Image - bigger without increasing header height */}
        <a className="block h-40 xl:mr-8 overflow-hidden" href="#hero">
          <img
            src={Logo}
            alt="OTxpress"
            className="h-full w-auto scale-110" // makes logo bigger
          />
          
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
          <Link to="/track" className="hover:text-red-400 transition-colors">Track</Link>
          <Link to="/bookdelivery" className="hover:text-red-400 transition-colors">Book Delivery</Link>
          <Link to="/pricing" className="hover:text-red-400 transition-colors">Pricing</Link>
          <Link to="/aboutus" className="hover:text-red-400 transition-colors">AboutUs</Link>
          <Link to="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        {/* <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-600 hover:text-white text-sm transition-all"
          >
            Sign Up
          </Link>
        </div> */}

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 20 20">
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
        <div className="md:hidden px-4 pb-4 bg-black border-t border-red-700">
          <nav className="flex flex-col gap-4 text-sm">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Home</Link>
            <Link to="/track" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Track</Link>
            <Link to="/bookdelivery" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Book Delivery</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Pricing</Link>
            <Link to="/aboutus" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">AboutUs</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Contact</Link>
            <hr className="border-red-700" />
            {/* <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Login</Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="text-red-400 font-semibold hover:text-red-300 transition-colors"
            >
              Sign Up
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;






