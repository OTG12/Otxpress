import React from 'react'

const Contact = () => {
  return (
     <div className="pt-20 px-4 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          Have a question or need help? Send us a message and we’ll get back to you shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form className="bg-white p-6 rounded shadow space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">Our Office</h2>
            <p>47 Jaiyeoba Street, Shasha, Lagos, Nigeria</p>

            <h2 className="text-xl font-semibold">Call Us</h2>
            <p>+234 812 001 3544</p>

            <h2 className="text-xl font-semibold">Email</h2>
            <p>support@logisticsco.com</p>

            <h2 className="text-xl font-semibold">Working Hours</h2>
            <p>Mon – Sat: 9AM – 6PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact