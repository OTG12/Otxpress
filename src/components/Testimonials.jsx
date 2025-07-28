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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-500 uppercase">
            Customer Experiences
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by Businesses Across Nigeria
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-red-400 mx-auto">
            Hear from satisfied customers who rely on our delivery services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-black p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative border border-red-600"
            >
              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-red-500' : 'text-gray-700'}`} 
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-red-400 italic mb-6">
                "{testimonial.message}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-red-500"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <div className="flex items-center text-sm text-red-500">
                    <span>{testimonial.location}</span>
                    <span className="mx-2">•</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>

              {/* Decorative quote mark */}
              <div className="absolute top-6 right-6 text-red-600 text-5xl font-serif">
                "
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors">
            Share Your Experience
            <svg className="ml-3 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;