// import React from "react";
// import TM1 from '../assets/TM1.jpeg';
// import TM3 from '../assets/TM3.jpeg';
// import TM2 from '../assets/TM2.jpeg';
// import { StarIcon } from "@heroicons/react/24/solid"; // Optional: requires Heroicons installed

// const testimonials = [
//   {
//     name: "Ada",
//     location: "Lagos",
//     message: "Super fast delivery! I use this service weekly and they never disappoint.",
//     image: TM1,
//     rating: 5,
//   },
//   {
//     name: "Chinedu",
//     location: "Abuja",
//     message: "The tracking feature is a big help. I always know where my package is.",
//     image: TM2,
//     rating: 4,
//   },
//   {
//     name: "Zainab",
//     location: "Port Harcourt",
//     message: "Affordable and reliable. Great customer service too!",
//     image: TM3,
//     rating: 5,
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="py-16 px-6 bg-[#0d0d0d] text-center">
//       <h2 className="text-3xl font-bold mb-10 text-red-600">
//         What Our Customers Say
//       </h2>

//       <div className="grid md:grid-cols-3 gap-8">
//         {testimonials.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
//             />
//             <p className="text-gray-600 italic">"{item.message}"</p>

//             <div className="flex justify-center gap-1 mt-4">
//               {[...Array(item.rating)].map((_, i) => (
//                 <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
//               ))}
//             </div>

//             <p className="mt-4 font-semibold text-gray-800">
//               – {item.name}, {item.location}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;




import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import TM1 from '../assets/TM1.jpeg';
import TM2 from '../assets/TM2.jpeg';
import TM3 from '../assets/TM3.jpeg';

const testimonials = [
  {
    name: "Ada Okeke",
    location: "Lagos",
    message: "OTxpress delivers faster than any other service I've used. My weekly shipments always arrive ahead of schedule, and their customer support is exceptional when I have special requests.",
    image: TM1,
    rating: 5,
    date: "March 15, 2023"
  },
  {
    name: "Chinedu Okafor",
    location: "Abuja",
    message: "The real-time tracking feature gives me peace of mind. I run an e-commerce business and being able to share precise delivery updates with my customers has significantly improved our ratings.",
    image: TM2,
    rating: 4,
    date: "April 2, 2023"
  },
  {
    name: "Zainab Mohammed",
    location: "Port Harcourt",
    message: "After trying several delivery services, OTxpress stands out for their reliability and fair pricing. They handled my fragile items with care and the customer service team resolved my inquiry within minutes.",
    image: TM3,
    rating: 5,
    date: "May 10, 2023"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-red-500 tracking-wider uppercase mb-4 block">
            Customer Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Trusted by Businesses <span className="text-red-500">Across Nigeria</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear from satisfied customers who rely on our premium delivery services
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative border border-gray-800 hover:border-red-500/30 group"
            >
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-700'}`} 
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 relative">
                <div className="absolute -top-4 -left-2 text-red-500/20 text-5xl font-serif transform -scale-x-100">
                  "
                </div>
                {testimonial.message}
                <div className="absolute -bottom-6 -right-2 text-red-500/20 text-5xl font-serif">
                  "
                </div>
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center pt-4 border-t border-gray-800">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-red-500/50 group-hover:border-red-500 transition-colors duration-300"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>{testimonial.location}</span>
                    <span className="mx-2">•</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/3 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center px-8 py-4 bg-red-600 text-white font-medium rounded-2xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Share Your Experience
            <svg className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;