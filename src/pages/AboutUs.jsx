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
import { FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTruck, FaCar } from 'react-icons/fa';
import Logo from '../assets/Logo.jpeg';

const AboutUs = () => {
  return (
    <section className="bg-black text-red-500 min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 flex items-center  mt-[160px] md:mt-[64px]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left - Text Content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-sm font-semibold tracking-wider text-red-500 uppercase">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="text-red-500">OTXpress</span>
            </h2>
          </div>

          <p className="text-lg text-red-400 leading-relaxed">
            Welcome to <span className="text-white font-semibold">OTXpress</span>, where we redefine transportation excellence through our dual offerings of premium logistics solutions and luxury car rentals.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black p-6 rounded-lg border-l-4 border-red-500 border border-red-600">
              <FaTruck className="text-red-500 text-3xl mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-white">Logistics Division</h3>
              <p className="text-red-400">
                Nationwide delivery services with real-time tracking and guaranteed timelines.
              </p>
            </div>
            <div className="bg-black p-6 rounded-lg border-l-4 border-red-500 border border-red-600">
              <FaCar className="text-red-500 text-3xl mb-3" />
              <h3 className="text-xl font-semibold mb-2 text-white">Luxury Rentals</h3>
              <p className="text-red-400">
                Premium vehicle fleet for business and leisure with flexible rental terms.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-3">Our Mission</h3>
              <p className="text-red-400 leading-relaxed">
                To revolutionize transportation in Nigeria by providing seamless logistics solutions and luxury mobility experiences, all backed by cutting-edge technology and unparalleled customer service.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-500 mb-3">Our Vision</h3>
              <p className="text-red-400 leading-relaxed">
                To become Africa's most trusted name in integrated transportation services, setting new standards for reliability, efficiency, and luxury in the mobility sector.
              </p>
            </div>
          </div>
        </div>

        {/* Right - Logo + Contact */}
        <div className="bg-black p-10 rounded-xl shadow-xl border border-red-600 space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src={Logo}
              alt="OTXpress logo"
              className="h-40 w-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-center text-white">
              Your Trusted Transportation <span className="text-red-500">Partner</span>
            </h3>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start">
              <FaGlobe className="text-red-500 mt-1 mr-4 text-xl" />
              <div>
                <h4 className="text-lg font-semibold mb-1 text-white">Website</h4>
                <a href="https://www.otxpress.com.ng" className="text-red-400 hover:text-white transition-colors">
                  www.otxpress.com.ng
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt className="text-red-500 mt-1 mr-4 text-xl" />
              <div>
                <h4 className="text-lg font-semibold mb-1 text-white">Address</h4>
                <p className="text-red-400">
                  33, Jago Plaza, Cele Bus Stop, Alagbole, Lagos
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="text-red-500 mt-1 mr-4 text-xl" />
              <div>
                <h4 className="text-lg font-semibold mb-1 text-white">Phone</h4>
                <div className="space-y-1">
                  <a href="tel:08095581857" className="block text-red-400 hover:text-white transition-colors">
                    0809 558 1857
                  </a>
                  <a href="tel:07088580867" className="block text-red-400 hover:text-white transition-colors">
                    0708 858 0867
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <FaEnvelope className="text-red-500 mt-1 mr-4 text-xl" />
              <div>
                <h4 className="text-lg font-semibold mb-1 text-white">Email</h4>
                <a href="mailto:info@otxpress.com.ng" className="text-red-400 hover:text-white transition-colors">
                  info@otxpress.com.ng
                </a>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Get in Touch
              <svg className="ml-3 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


