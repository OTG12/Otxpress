import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
     <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          OTXpress
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/track">Track</Link>
          <Link to="/bookdelivery">Book Delivery</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/login" className="text-sm text-gray-700 hover:underline">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Sign Up</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t">
          <nav className="flex flex-col gap-4 text-sm text-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/track" onClick={() => setIsOpen(false)}>Track</Link>
            <Link to="/book" onClick={() => setIsOpen(false)}>Book Delivery</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <hr />
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="text-blue-600 font-semibold">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header