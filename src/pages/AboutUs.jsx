// import React from 'react';
// import Logo from '../assets/Logo2.jpeg';

// const AboutUs = () => {
//   return (
//     <section className="bg-[#0d0d0d] text-white min-h-screen w-full py-16 px-4 flex items-center">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
        
//         {/* Left - Text Content */}
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">ABOUT US</h2>

//           <p className="mb-6 text-gray-300 leading-relaxed">
//             Welcome to <span className="text-white font-semibold">OTXpress</span>, your premier destination for reliable logistics solutions and premium luxury car rentals.
//           </p>

//           <p className="mb-8 text-gray-300 leading-relaxed">
//             Our services simplify your transportation needs while providing top-notch service, efficiency, and style.
//           </p>

//           <h3 className="text-2xl font-bold text-red-600 mb-4">MISSION</h3>

//           <p className="mb-4 text-gray-300 leading-relaxed">
//             At <span className="text-white font-semibold">OTXpress</span>, our mission is to empower businesses and individuals by delivering comprehensive logistics and luxury car services.
//           </p>

//           <p className="text-gray-300 leading-relaxed">
//             We aim to enhance supply chains, streamline operations, and create exceptional experiences through a skilled team and modern technology — integrating logistics and luxury into your everyday needs.
//           </p>
//         </div>

//         {/* Right - Logo + Contact */}
//         <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full space-y-6">
//           {/* Logo */}
//           <div className="flex flex-col items-center text-center">
//             <a className="block h-70 overflow-hidden" href="#hero">
//               <img
//                 src={Logo}
//                 alt="OTXpress logo"
//                 className="h-full w-auto scale-110"
//               />
//             </a>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <div>
//               <h4 className="text-lg font-semibold text-red-500">Website</h4>
//               <p className="text-gray-300">www.otxpress.com.ng</p>
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold text-red-500">Address</h4>
//               <p className="text-gray-300">
//                 33, Jago Plaza, Cele Bus Stop, Alagbole, Lagos
//               </p>
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold text-red-500">Contact</h4>
//               <p className="text-gray-300">0809 558 1857, 0708 858 0867</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default AboutUs;

import React from 'react';
import { FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTruck, FaCar, FaArrowRight } from 'react-icons/fa';
import Logo from '../assets/Logo.jpeg';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-red-500 tracking-wider uppercase mb-4 block">
            Excellence in Transportation
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-red-500">OTXpress</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Redefining transportation excellence through premium logistics solutions and luxury car rentals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-12">
            {/* Mission & Vision */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-white flex items-center">
                  <div className="w-2 h-6 bg-red-500 mr-3 rounded-full"></div>
                  Our Mission
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To revolutionize transportation in Nigeria by providing seamless logistics solutions and luxury mobility experiences, all backed by cutting-edge technology and unparalleled customer service.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-white flex items-center">
                  <div className="w-2 h-6 bg-red-500 mr-3 rounded-full"></div>
                  Our Vision
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To become Africa's most trusted name in integrated transportation services, setting new standards for reliability, efficiency, and luxury in the mobility sector.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Our Services</h2>
              
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-500 p-3 rounded-lg mr-4">
                      <FaTruck className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Logistics Division</h3>
                      <p className="text-gray-400">
                        Nationwide delivery services with real-time tracking and guaranteed timelines.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-500 p-3 rounded-lg mr-4">
                      <FaCar className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Luxury Rentals</h3>
                      <p className="text-gray-400">
                        Premium vehicle fleet for business and leisure with flexible rental terms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Card */}
          <div className="sticky top-24">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 shadow-2xl">
              {/* Logo */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src={Logo}
                  alt="OTXpress logo"
                  className="h-32 w-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-center text-white">
                  Your Trusted Transportation <span className="text-red-500">Partner</span>
                </h3>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-red-500 p-2 rounded-md mr-4">
                    <FaGlobe className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-white">Website</h4>
                    <a 
                      href="https://www.otxpress.com.ng" 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      www.otxpress.com.ng
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-500 p-2 rounded-md mr-4">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-white">Address</h4>
                    <p className="text-gray-400">
                      33, Jago Plaza, Cele Bus Stop, Alagbole, Lagos
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-500 p-2 rounded-md mr-4">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-white">Phone</h4>
                    <div className="space-y-1">
                      <a 
                        href="tel:09064862817" 
                        className="block text-gray-400 hover:text-red-500 transition-colors"
                      >
                        +234 906 486 2817
                      </a>
                      <a 
                        href="tel:09036817576" 
                        className="block text-gray-400 hover:text-red-500 transition-colors"
                      >
                        +234 903 681 7576
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-500 p-2 rounded-md mr-4">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-white">Email</h4>
                    <a 
                      href="mailto:otxpress23@gmail.com" 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      otxpress23@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="/contact"
                className="w-full bg-red-600 text-white font-medium py-4 px-6 rounded-xl hover:bg-red-700 transition-all duration-300 flex items-center justify-center group"
              >
                Get in Touch
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


