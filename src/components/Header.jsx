// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/Logo.jpeg"; // make sure this path is correct

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50 border-b border-red-700">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center h-16">
//         {/* Logo Image - bigger without increasing header height */}
//         <a className="block h-40 -ml-2 xl:mr-8 overflow-hidden">
//           <img src={Logo} alt="OTxpress" className="h-full w-auto scale-125" />
//         </a>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium">
//           <Link to="/" className="hover:text-red-400 transition-colors">
//             Home
//           </Link>
//           <Link to="/track" className="hover:text-red-400 transition-colors">
//             Track
//           </Link>
//           <Link
//             to="/bookdelivery"
//             className="hover:text-red-400 transition-colors"
//           >
//             Book Delivery
//           </Link>
//           <Link to="/pricing" className="hover:text-red-400 transition-colors">
//             Pricing
//           </Link>
//           <Link to="/aboutus" className="hover:text-red-400 transition-colors">
//             AboutUs
//           </Link>
//           <Link to="/contact" className="hover:text-red-400 transition-colors">
//             Contact
//           </Link>
//         </nav>

//         {/* Desktop Auth Buttons */}
//         {/* <div className="hidden md:flex gap-3">
//           <Link
//             to="/login"
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-all"
//           >
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-600 hover:text-white text-sm transition-all"
//           >
//             Sign Up
//           </Link>
//         </div> */}

//         {/* Hamburger Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle menu"
//         >
//           <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 20 20">
//             {isOpen ? (
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             ) : (
//               <path
//                 fillRule="evenodd"
//                 d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2z"
//                 clipRule="evenodd"
//               />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 bg-black border-t border-red-700">
//           <nav className="flex flex-col gap-4 text-sm">
//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-red-400 transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               to="/track"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-red-400 transition-colors"
//             >
//               Track
//             </Link>
//             <Link
//               to="/bookdelivery"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-red-400 transition-colors"
//             >
//               Book Delivery
//             </Link>
//             <Link
//               to="/pricing"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-red-400 transition-colors"
//             >
//               Pricing
//             </Link>
//             <Link
//               to="/aboutus"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-red-400 transition-colors"
//             >
//               AboutUs
//             </Link>
//             <Link
//               to="/contact"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-red-400 transition-colors"
//             >
//               Contact
//             </Link>
//             <hr className="border-red-700" />
//             {/* <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition-colors">Login</Link>
//             <Link
//               to="/register"
//               onClick={() => setIsOpen(false)}
//               className="text-red-400 font-semibold hover:text-red-300 transition-colors"
//             >
//               Sign Up
//             </Link> */}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.jpeg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-black text-white fixed top-0 left-0 w-full z-50 mb-8 transition-all duration-300 ${isScrolled ? 'shadow-lg py-2 border-b border-red-700' : 'py-3 border-b border-red-700'}`}>
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
          
          {/* Auth Buttons - Uncomment when needed */}
          {/* <div className="flex gap-3 ml-6">
            <AuthLink to="/login" isPrimary>Login</AuthLink>
            <AuthLink to="/register">Sign Up</AuthLink>
          </div> */}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-black overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="flex flex-col px-4 pb-4 space-y-3">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/dispatchTracker" onClick={() => setIsOpen(false)}>DispatchTracker</MobileNavLink>
          <MobileNavLink to="/bookdelivery" onClick={() => setIsOpen(false)}>Book Delivery</MobileNavLink>
          <MobileNavLink to="/pricing" onClick={() => setIsOpen(false)}>Pricing</MobileNavLink>
          <MobileNavLink to="/aboutus" onClick={() => setIsOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          
          {/* Mobile Auth Buttons - Uncomment when needed */}
          {/* <div className="flex flex-col gap-2 pt-3 border-t border-gray-800 mt-3">
            <MobileAuthLink to="/login" onClick={() => setIsOpen(false)}>Login</MobileAuthLink>
            <MobileAuthLink to="/register" isPrimary onClick={() => setIsOpen(false)}>Sign Up</MobileAuthLink>
          </div> */}
        </nav>
      </div>
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className={({ isActive }) => 
      `text-sm font-medium hover:text-red-400 transition-colors ${isActive ? 'text-red-500' : 'text-white'}`
    }
  >
    {children}
  </Link>
);

// Reusable Mobile NavLink component
const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className={({ isActive }) => 
      `py-2 px-3 rounded-md hover:bg-gray-800 transition-colors ${isActive ? 'text-red-500 font-medium' : 'text-white'}`
    }
  >
    {children}
  </Link>
);

// Reusable AuthLink component (uncomment when needed)
/*
const AuthLink = ({ to, isPrimary = false, children }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
      isPrimary 
        ? 'bg-red-600 hover:bg-red-700 text-white' 
        : 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
    }`}
  >
    {children}
  </Link>
);

// Reusable Mobile AuthLink component (uncomment when needed)
const MobileAuthLink = ({ to, isPrimary = false, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`py-2 px-4 rounded text-center font-medium transition-colors ${
      isPrimary 
        ? 'bg-red-600 hover:bg-red-700 text-white' 
        : 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
    }`}
  >
    {children}
  </Link>
);
*/

export default Header;