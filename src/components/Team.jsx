// import React from 'react';
// import Ceo from '../assets/Ceo.jpeg';

// const Team = () => {
//   return (
//     <section className="bg-[#0d0d0d] dark:bg-[#0d0d0d] text-gray-300">
//       <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
//         <div className="mx-auto mb-12 max-w-screen-sm text-center">
//           <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-red-600">
//             Our Team
//           </h2>
//           <p className="font-light text-gray-400 sm:text-xl">
//             Meet the passionate mind behind our success. Powered by vision, speed, and commitment.
//           </p>
//         </div>

//         <div className="grid gap-12 lg:grid-cols-2 items-center">
//           {/* CEO Card */}
//           <div className="text-center">
//             <img
//               className="mx-auto mb-4 w-80 h-80 object-cover rounded-xl"
//               src={Ceo}
//               alt="Otene Success Avatar"
//             />
//             <h3 className="mb-1 text-2xl font-bold tracking-tight text-white">
//               Otene Success
//             </h3>
//             <p className="text-red-500">CEO / Co-founder</p>
//           </div>

//           {/* Write-up Section */}
//           <div className="text-left max-w-xl mx-auto">
//             <h3 className="text-2xl font-semibold text-red-600 mb-3">Driven by Purpose</h3>
//             <p className="mb-4 text-gray-400 leading-relaxed">
//               At the core of our mission is a simple but powerful idea to redefine last mile delivery
//               with unmatched efficiency and heart. With years of logistics experience and a vision to empower businesses,
//               Otene leads the charge in transforming local delivery into a smooth, reliable, and smart experience.
//             </p>
//             <p className="text-gray-500 italic">
//               “We don’t just deliver packages. We deliver trust, speed, and peace of mind.”
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;

import React from 'react';
import { FaLinkedin, FaTwitter, FaQuoteLeft } from 'react-icons/fa';
import Ceo from '../assets/Ceo.jpeg';

const Team = () => {
  return (
    <section className="bg-black text-red-400 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-500 uppercase">
            Leadership
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Meet Our Visionary Team
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-red-400 mx-auto">
            The passionate minds driving innovation in logistics
          </p>
        </div>

        {/* Team Content */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* CEO Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-black p-6 rounded-2xl shadow-xl text-center border border-red-600">
              <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-red-500 group-hover:border-red-400 transition-all duration-300">
                <img
                  src={Ceo}
                  alt="Otene Success"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Otene Success
              </h3>
              <p className="text-red-500 mb-4">CEO & Co-founder</p>
              
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-red-400 hover:text-white transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-red-400 hover:text-white transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Write-up Section */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              <span className="text-red-500">Driven</span> by Purpose, <span className="text-red-400">Powered</span> by Innovation
            </h3>
            
            <div className="space-y-4 text-red-400 leading-relaxed">
              <p>
                With over a decade of experience revolutionizing logistics in Nigeria, Otene Success founded OTxpress with a singular vision: to transform last-mile delivery into a seamless, reliable experience for businesses and individuals alike.
              </p>
              <p>
                His leadership combines technical expertise with a deep understanding of local market needs, creating solutions that bridge efficiency gaps in Nigeria's growing e-commerce landscape.
              </p>
            </div>
            
            <div className="relative bg-black p-6 rounded-xl border-l-4 border-red-500 border border-red-600">
              <FaQuoteLeft className="absolute top-4 left-4 text-red-500/20 text-3xl" />
              <blockquote className="text-lg italic text-white pl-8">
                "We don't just move packages—we move businesses forward. Every delivery is a promise kept, every route optimized is time saved, and every satisfied customer is why we do what we do."
              </blockquote>
            </div>
            
            {/* <div className="pt-4">
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Learn More About Our Story
                <svg className="ml-3 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;