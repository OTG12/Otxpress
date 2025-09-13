import React from "react";
import {
  Truck,
  LocateFixed,
  ShieldCheck,
  Headset,
  Clock,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Fast Delivery",
      description: "We deliver packages within 24 hours with our priority service. Guaranteed on-time delivery or your money back.",
      icon: <Truck className="w-8 h-8" />,
    },
    {
      title: "Live Tracking",
      description: "Real-time GPS tracking with updates every 15 minutes. Know exactly where your package is at all times.",
      icon: <LocateFixed className="w-8 h-8" />,
    },
    {
      title: "Affordable Pricing",
      description: "Competitive rates in Naira (₦). No hidden fees. Save up to 30% compared to others.",
      icon: () => <span className="text-2xl font-bold">₦</span>,
    },
    {
      title: "Secure Handling",
      description: "All packages are insured and handled with care. Your items are protected from damage or loss.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: "24/7 Support",
      description: "Our customer service team is available around the clock to assist with any questions or issues.",
      icon: <Headset className="w-8 h-8" />,
    },
    {
      title: "Flexible Scheduling",
      description: "Choose delivery windows that work for you, including evenings and weekends.",
      icon: <Clock className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-medium text-red-500 tracking-wider uppercase mb-4 block">
            Our Advantages
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Why Choose <span className="text-red-500">OTxpress</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Delivering excellence through every step of your logistics journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors duration-300">
                    <div className="text-red-500">
                      {typeof feature.icon === 'function' ? feature.icon() : feature.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-0.5 bg-red-500"></div>
                </div>
              </div>

              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group inline-flex items-center px-8 py-4 bg-red-600 text-white font-medium rounded-2xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Learn More About Our Services
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
