import React from 'react';
import Logo from '../assets/Logo2.jpeg';

const AboutUs = () => {
  return (
    <section className="bg-[#0d0d0d] text-white min-h-screen w-full py-16 px-4 flex items-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
        
        {/* Left - Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">ABOUT US</h2>

          <p className="mb-6 text-gray-300 leading-relaxed">
            Welcome to <span className="text-white font-semibold">OTXpress</span>, your premier destination for reliable logistics solutions and premium luxury car rentals.
          </p>

          <p className="mb-8 text-gray-300 leading-relaxed">
            Our services simplify your transportation needs while providing top-notch service, efficiency, and style.
          </p>

          <h3 className="text-2xl font-bold text-red-600 mb-4">MISSION</h3>

          <p className="mb-4 text-gray-300 leading-relaxed">
            At <span className="text-white font-semibold">OTXpress</span>, our mission is to empower businesses and individuals by delivering comprehensive logistics and luxury car services.
          </p>

          <p className="text-gray-300 leading-relaxed">
            We aim to enhance supply chains, streamline operations, and create exceptional experiences through a skilled team and modern technology — integrating logistics and luxury into your everyday needs.
          </p>
        </div>

        {/* Right - Logo + Contact */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center text-center">
            <a className="block h-70 overflow-hidden" href="#hero">
              <img
                src={Logo}
                alt="OTXpress logo"
                className="h-full w-auto scale-110"
              />
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-red-500">Website</h4>
              <p className="text-gray-300">www.otxpress.com.ng</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-500">Address</h4>
              <p className="text-gray-300">
                33, Jago Plaza, Cele Bus Stop, Alagbole, Lagos
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-500">Contact</h4>
              <p className="text-gray-300">0809 558 1857, 0708 858 0867</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;


