// import React from 'react';

// const Contact = () => {
//   return (
//     <div className="pt-20 px-4 pb-16 bg-[#0d0d0d] min-h-screen text-white">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Contact Us</h1>
//         <p className="text-center text-gray-300 mb-12">
//           Have a question or need help? Send us a message and we’ll get back to you shortly.
//         </p>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Contact Form */}
//           <form className="bg-[#1a1a1a] p-6 rounded shadow space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full bg-black text-white border border-red-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full bg-black text-white border border-red-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//             <textarea
//               rows="5"
//               placeholder="Your Message"
//               className="w-full bg-black text-white border border-red-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//             <button
//               type="submit"
//               className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
//             >
//               Send Message
//             </button>
//           </form>

//           {/* Contact Info */}
//           <div className="bg-[#1a1a1a] p-6 rounded shadow space-y-4">
//             <h2 className="text-xl font-semibold text-red-500">Our Office</h2>
//             <p className="text-gray-300">47 Jaiyeoba Street, Shasha, Lagos, Nigeria</p>

//             <h2 className="text-xl font-semibold text-red-500">Call Us</h2>
//             <p className="text-gray-300">+234 812 001 3544</p>

//             <h2 className="text-xl font-semibold text-red-500">Email</h2>
//             <p className="text-gray-300">support@logisticsco.com</p>

//             <h2 className="text-xl font-semibold text-red-500">Working Hours</h2>
//             <p className="text-gray-300">Mon – Sat: 9AM – 6PM</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
              Contact Us
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a question or need help? Our team is here to assist you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold mb-6 text-white">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-4 px-6 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-semibold mb-6 text-white">Get in touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-600 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Our Office</h3>
                    <p className="text-gray-400">33, Jago Plaza, Cele Bus Stop, Alagbole, Lagos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600 p-3 rounded-lg mr-4">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Call Us</h3>
                    <div className="space-y-1">
                      <a href="tel:09064862817" className="block text-gray-400 hover:text-red-500 transition-colors">
                        +234 906 486 2817
                      </a>
                      <a href="tel:09036817576" className="block text-gray-400 hover:text-red-500 transition-colors">
                        +234 903 681 7576
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                    <a href="mailto:otxpress23@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors">
                      otxpress23@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600 p-3 rounded-lg mr-4">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Working Hours</h3>
                    <p className="text-gray-400">Mon - Sat: 8AM - 5PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-semibold mb-6 text-white">Follow us</h2>
              <p className="text-gray-400 mb-6">Stay connected with us on social media</p>
              
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/2348095581857" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Contact us on WhatsApp"
                >
                  <FaWhatsapp className="text-white text-2xl" />
                </a>
                
                <a 
                  href="https://www.instagram.com/otxpress?igsh=a3RpbXQwcWZjOGd5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram className="text-white text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Contact;