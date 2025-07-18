import React from 'react'
import { Truck, LocateFixed, BadgeDollarSign } from "lucide-react";


const Features = () => {
  const features = [
    {
      title: "Fast Delivery",
      description: "We deliver packages within 24 hours, guaranteed.",
      icon: <Truck className="w-10 h-10 text-primary-600 mb-4" />,
    },
    {
      title: "Live Tracking",
      description: "Track your shipment in real-time on any device.",
      icon: <LocateFixed className="w-10 h-10 text-primary-600 mb-4" />,
    },
    {
      title: "Affordable Pricing",
      description: "Competitive rates for all your shipping needs.",
      icon: <BadgeDollarSign className="w-10 h-10 text-primary-600 mb-4" />,
    },
  ];
  return (
  <section className="py-20 px-6 bg-[#0d0d0d] text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-10 text-red-600">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white shadow-md hover:shadow-xl rounded-xl transition-all duration-300 hover:scale-[1.03] border border-gray-100"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features