import React from "react";
import { FaTruckMoving } from "react-icons/fa"; // using react-icons (make sure it's installed)
// Or you can use a custom image like:
// import DeliveryImg from "../assets/delivery-cta.png";

const CTA = () => {
  return (
    <section className="bg-[#2e2e2e] text-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <FaTruckMoving className="text-6xl text-white" />
          {/* Or use a custom image: 
          <img src={DeliveryImg} alt="Delivery" className="w-24 h-24" /> 
          */}
        </div>

        <h2 className="text-4xl font-extrabold mb-4">Need Something Delivered?</h2>
        <p className="text-lg font-light mb-6">
          From parcels to packages, we’ve got your back. Reliable, fast, and always on time.
        </p>

        <a
          href="/bookdelivery"
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
        >
          Book Now
        </a>
      </div>
    </section>
  );
};

export default CTA;
