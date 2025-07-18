import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import DeliveryImg from "../assets/delivery-cta.jpg"; // Make sure this path is correct

const CTA = () => {
  return (
    <section className="bg-[#0d0d0d] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Text */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <FaTruckMoving className="text-6xl text-white" />
          </div>

          <h2 className="text-4xl text-red-600 font-extrabold mb-4">
            Need Something Delivered?
          </h2>
          <p className="text-lg font-light mb-6 text-gray-300">
            From parcels to packages, we’ve got your back. Reliable, fast, and always on time.
          </p>

          <a
            href="/bookdelivery"
            className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 rounded-lg font-semibold shadow-md transition"
          >
            Book Now
          </a>
        </div>

        {/* Right - Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={DeliveryImg}
            alt="Delivery Illustration"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;

