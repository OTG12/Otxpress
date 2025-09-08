import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ⬅️ added useNavigate
import Logo from "../assets/Logo.jpeg";
import { logoutUser } from "../services/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ⬅️ initialize navigate

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-black text-white fixed top-0 left-0 w-full z-50 mb-8 transition-all duration-300 ${
        isScrolled
          ? "shadow-lg py-2 border-b border-red-700"
          : "py-3 border-b border-red-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center h-16">
          <img
            src={Logo}
            alt="OTxpress"
            className="h-full w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dispatchTracker">DispatchTracker</NavLink>
          <NavLink to="/bookdelivery">Book Delivery</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/aboutus">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {/* Logout button */}
          <button
            onClick={() => logoutUser(navigate)}
            className="text-sm font-medium text-white hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-4 pb-4 space-y-3">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink to="/dispatchTracker" onClick={() => setIsOpen(false)}>
            DispatchTracker
          </MobileNavLink>
          <MobileNavLink to="/bookdelivery" onClick={() => setIsOpen(false)}>
            Book Delivery
          </MobileNavLink>
          <MobileNavLink to="/pricing" onClick={() => setIsOpen(false)}>
            Pricing
          </MobileNavLink>
          <MobileNavLink to="/aboutus" onClick={() => setIsOpen(false)}>
            About Us
          </MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </MobileNavLink>

          {/* Logout in mobile */}
          <button
            onClick={() => {
              setIsOpen(false);
              logoutUser(navigate);
            }}
            className="py-2 px-3 rounded-md text-left hover:bg-gray-800 transition-colors text-white"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm font-medium hover:text-red-400 transition-colors"
  >
    {children}
  </Link>
);

// Reusable Mobile NavLink component
const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="py-2 px-3 rounded-md hover:bg-gray-800 transition-colors text-white"
  >
    {children}
  </Link>
);

export default Header;
