// import React from 'react'

// const Footer = () => {
//   return (
//       <footer className="bg-black text-white py-6 text-center">
//       <p>&copy; {new Date().getFullYear()} Logistics Co. All rights reserved.</p>
//     </footer>
//   )
// }

// export default Footer

import React from 'react';
import { FaTruck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-red-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-red-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <FaTruck className="text-red-500 text-2xl mr-2" />
              <span className="text-xl font-bold text-white">OTxpress</span>
            </div>
            <p className="mb-4">
              Redefining logistics in Nigeria with fast, reliable, and affordable delivery services across all 36 states.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-red-400 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-red-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-red-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-red-400 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/track" className="hover:text-white transition-colors">Track Shipment</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhone className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                <span>+234 812 001 3544</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                <span>info@otxpress.com.ng</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                <span>33, Jago Plaza, Cele Bus Stop, Alagbole, Lagos</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to get updates on our services and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 w-full bg-black text-white border border-red-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-red-400"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-black px-4 py-2 rounded-r-lg transition-colors font-bold"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-red-500 mt-2">
              We'll never share your email. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-red-600 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-red-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OTxpress Logistics. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-red-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-red-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-red-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;