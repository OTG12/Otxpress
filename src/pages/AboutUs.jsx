import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-[#0d0d0d] text-white min-h-screen w-full py-16 px-4 flex items-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
        {/* Left - Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">ABOUT US</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Welcome to <span className="text-white font-semibold">OTXpress</span>, your premier destination for seamless logistics solutions and premium luxury car rentals and deliveries.
          </p>
          <p className="mb-8 text-gray-300 leading-relaxed">
            Our services are designed to simplify your transportation needs while providing exceptional service, efficiency, and style.
          </p>

          <h3 className="text-2xl font-bold text-red-600 mb-4">MISSION</h3>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Our mission at <span className="text-white font-semibold">OTXpress</span> is to empower businesses and individuals by providing comprehensive logistics solutions and exceptional luxury car rental service.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We are dedicated to streamlining supply chains, optimizing operations, and delivering remarkable experiences through our skilled team and advanced technology. Our aim is to seamlessly integrate logistics and luxury, making them essential components of your transportation needs.
          </p>
        </div>

        {/* Right - Contact + Logo */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full">
          <div className="mb-6">
            <img src="/logo.png" alt="OTXpress Logo" className="w-32 mb-4" />
            <p className="text-sm text-gray-400 italic">...logistics made simple</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-red-500">Website</h4>
              <p className="text-gray-300">www.otxpress.com.ng</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-500">Address</h4>
              <p className="text-gray-300">33, Jago Plaza Cele Bus Stop, Alagbole, Lagos</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-500">Contact</h4>
              <p className="text-gray-300">08095581857, 07088580867</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

