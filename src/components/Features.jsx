import React from "react";
import {
  Truck,
  LocateFixed,
  ShieldCheck,
  Headset,
  Clock
} from "lucide-react";

// Option 1: Using Unicode Naira symbol directly
const NairaIcon = () => (
  <span className="w-12 h-12 mb-4 text-red-500 text-4xl font-bold">₦</span>
);

// Option 2: If you want to use react-icons (requires installation)
// import { FaNairaSign } from "react-icons/fa6";
// const NairaIcon = () => <FaNairaSign className="w-12 h-12 mb-4 text-red-500" />;

const Features = () => {
  const features = [
    {
      title: "Fast Delivery",
      description: "We deliver packages within 24 hours with our priority service. Guaranteed on-time delivery or your money back.",
      icon: <Truck className="w-12 h-12 mb-4" />,
      color: "text-red-500",
    },
    {
      title: "Live Tracking",
      description: "Real-time GPS tracking with updates every 15 minutes. Know exactly where your package is at all times.",
      icon: <LocateFixed className="w-12 h-12 mb-4" />,
      color: "text-red-500",
    },
    {
      title: "Affordable Pricing",
      description: "Competitive rates in Naira (₦). No hidden fees. Save up to 30% compared to others.",
      icon: <NairaIcon />,
      color: "text-red-500"
    },
    {
      title: "Secure Handling",
      description: "All packages are insured and handled with care. Your items are protected from damage or loss.",
      icon: <ShieldCheck className="w-12 h-12 mb-4" />,
      color: "text-red-500",
    },
    {
      title: "24/7 Support",
      description: "Our customer service team is available around the clock to assist with any questions or issues.",
      icon: <Headset className="w-12 h-12 mb-4" />,
      color: "text-red-500",
    },
    {
      title: "Flexible Scheduling",
      description: "Choose delivery windows that work for you, including evenings and weekends.",
      icon: <Clock className="w-12 h-12 mb-4" />,
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-500 uppercase">
            Our Advantages
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-red-500 sm:text-4xl">
            Why Choose OTxpress
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-red-400 mx-auto">
            Delivering excellence through every step of your logistics journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`${feature.color} mb-6`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-red-500 mb-3">
                  {feature.title}
                </h3>
                <p className="text-red-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors">
            Learn More About Our Services
            <svg
              className="ml-3 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;

// import React from 'react'
// import { Truck, LocateFixed, BadgeDollarSign } from "lucide-react";

// const Features = () => {
//   const features = [
//     {
//       title: "Fast Delivery",
//       description: "We deliver packages within 24 hours, guaranteed.",
//       icon: <Truck className="w-10 h-10 text-primary-600 mb-4" />,
//     },
//     {
//       title: "Live Tracking",
//       description: "Track your shipment in real-time on any device.",
//       icon: <LocateFixed className="w-10 h-10 text-primary-600 mb-4" />,
//     },
//     {
//       title: "Affordable Pricing",
//       description: "Competitive rates for all your shipping needs.",
//       icon: <BadgeDollarSign className="w-10 h-10 text-primary-600 mb-4" />,
//     },
//   ];
//   return (
//   <section className="py-20 px-6 bg-[#0d0d0d] text-center">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-extrabold mb-10 text-red-600">
//           Why Choose Us
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="p-8 bg-white shadow-md hover:shadow-xl rounded-xl transition-all duration-300 hover:scale-[1.03] border border-gray-100"
//             >
//               <div className="flex flex-col items-center">
//                 {feature.icon}
//                 <h3 className="text-xl font-semibold mb-2 text-gray-800">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Features
