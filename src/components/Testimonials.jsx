import React from "react";
import { StarIcon } from "@heroicons/react/24/solid"; // Optional: requires Heroicons installed

const testimonials = [
  {
    name: "Ada",
    location: "Lagos",
    message: "Super fast delivery! I use this service weekly and they never disappoint.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Chinedu",
    location: "Abuja",
    message: "The tracking feature is a big help. I always know where my package is.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Zainab",
    location: "Port Harcourt",
    message: "Affordable and reliable. Great customer service too!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        What Our Customers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic">"{item.message}"</p>

            <div className="flex justify-center gap-1 mt-4">
              {[...Array(item.rating)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>

            <p className="mt-4 font-semibold text-gray-800">
              – {item.name}, {item.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
