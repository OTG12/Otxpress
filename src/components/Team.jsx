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
import { FaLinkedin, FaTwitter, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import Ceo from '../assets/Ceo.jpeg';

const Team = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-red-500 tracking-wider uppercase mb-4 block">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Meet Our <span className="text-red-500">Visionary</span> Team
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The passionate minds driving innovation in Nigerian logistics
          </p>
        </div>

        {/* Team Content */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* CEO Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-3xl shadow-xl text-center border border-gray-800 group-hover:border-red-500/30 transition-all duration-500">
              <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-red-500/30 group-hover:border-red-500 transition-all duration-500">
                <img
                  src={Ceo}
                  alt="Otene Success"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Otene Success
              </h3>
              <p className="text-red-500 mb-6">CEO & Co-founder</p>
              
            </div>
          </div>

          {/* Write-up Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-semibold text-white">
              <span className="text-red-500">Driven</span> by Purpose, <span className="text-red-400">Powered</span> by Innovation
            </h3>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                With over a decade of experience revolutionizing logistics in Nigeria, Otene Success founded OTxpress with a singular vision: to transform last-mile delivery into a seamless, reliable experience for businesses and individuals alike.
              </p>
              <p>
                His leadership combines technical expertise with a deep understanding of local market needs, creating solutions that bridge efficiency gaps in Nigeria's growing e-commerce landscape.
              </p>
            </div>
            
            {/* Quote */}
            <div className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
              <FaQuoteLeft className="absolute top-6 left-6 text-red-500/20 text-4xl" />
              <blockquote className="text-lg italic text-white pl-10 leading-relaxed">
                "We don't just move packages—we move businesses forward. Every delivery is a promise kept, every route optimized is time saved, and every satisfied customer is why we do what we do."
              </blockquote>
            </div>
            
           
       
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default Team;