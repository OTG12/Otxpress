import React from 'react';

const Contact = () => {
  return (
    <div className="pt-20 px-4 pb-16 bg-[#0d0d0d] min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Contact Us</h1>
        <p className="text-center text-gray-300 mb-12">
          Have a question or need help? Send us a message and we’ll get back to you shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form className="bg-[#1a1a1a] p-6 rounded shadow space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-black text-white border border-red-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-black text-white border border-red-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full bg-black text-white border border-red-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-[#1a1a1a] p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold text-red-500">Our Office</h2>
            <p className="text-gray-300">47 Jaiyeoba Street, Shasha, Lagos, Nigeria</p>

            <h2 className="text-xl font-semibold text-red-500">Call Us</h2>
            <p className="text-gray-300">+234 812 001 3544</p>

            <h2 className="text-xl font-semibold text-red-500">Email</h2>
            <p className="text-gray-300">support@logisticsco.com</p>

            <h2 className="text-xl font-semibold text-red-500">Working Hours</h2>
            <p className="text-gray-300">Mon – Sat: 9AM – 6PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
