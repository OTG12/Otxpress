// import React from "react";
// import { FaTruckMoving } from "react-icons/fa";
// import DeliveryImg from "../assets/delivery-cta.jpeg"; // Make sure this path is correct

// const CTA = () => {
//   return (
//     <section className="bg-[#0d0d0d] text-white py-20 px-6">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//         {/* Left - Text */}
//         <div className="text-center md:text-left">
//           <div className="flex justify-center md:justify-start mb-6">
//             <FaTruckMoving className="text-6xl text-white" />
//           </div>

//           <h2 className="text-4xl text-red-600 font-extrabold mb-4">
//             Need Something Delivered?
//           </h2>
//           <p className="text-lg font-light mb-6 text-gray-300">
//             From parcels to packages, we’ve got your back. Reliable, fast, and always on time.
//           </p>

//           <a
//             href="/bookdelivery"
//             className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 rounded-lg font-semibold shadow-md transition"
//           >
//             Book Now
//           </a>
//         </div>

//         {/* Right - Image */}
//         <div className="flex justify-center md:justify-end">
//           <img
//             src={DeliveryImg}
//             alt="Delivery Illustration"
//             className="w-full max-w-sm rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTA;

import React from "react";
import { FaTruckMoving, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeliveryImg from "../assets/delivery-cta.jpeg";

const CTA = () => {
  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-900 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-red-800 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start mb-6 p-3 bg-red-900/50 rounded-full">
            <FaTruckMoving className="text-4xl text-red-500 animate-bounce" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-red-500">
            <span className="text-white">Need Something</span> Delivered?
          </h2>
          
          <p className="text-xl text-red-400 mb-8 max-w-lg mx-auto md:mx-0">
            From small parcels to large packages, we've got you covered with our reliable, fast, and always on-time delivery services across the nation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/bookdelivery"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Delivery Now
              <FaArrowRight className="ml-3" />
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-red-800 hover:border-red-500 text-red-400 font-bold rounded-lg hover:bg-red-900/30 transition-all duration-300"
            >
              Contact Our Team
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end relative">
          <div className="relative group">
            <img
              src={DeliveryImg}
              alt="Fast delivery service"
              className="w-full max-w-md rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-900/90 backdrop-blur-sm rounded-lg shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="font-bold text-white">24/7 Express Delivery</h4>
              <p className="text-sm text-red-200">Available nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

