import React from 'react';
import Ceo from '../assets/Ceo.jpeg';

const Team = () => {
  return (
    <section className="bg-[#0d0d0d] dark:bg-[#0d0d0d] text-gray-300">
      <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
        <div className="mx-auto mb-12 max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-red-600">
            Our Team
          </h2>
          <p className="font-light text-gray-400 sm:text-xl">
            Meet the passionate mind behind our success. Powered by vision, speed, and commitment.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* CEO Card */}
          <div className="text-center">
            <img
              className="mx-auto mb-4 w-80 h-80 object-cover rounded-xl"
              src={Ceo}
              alt="Otene Success Avatar"
            />
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-white">
              Otene Success
            </h3>
            <p className="text-red-500">CEO / Co-founder</p>
          </div>

          {/* Write-up Section */}
          <div className="text-left max-w-xl mx-auto">
            <h3 className="text-2xl font-semibold text-red-600 mb-3">Driven by Purpose</h3>
            <p className="mb-4 text-gray-400 leading-relaxed">
              At the core of our mission is a simple but powerful idea — to redefine last-mile delivery
              with unmatched efficiency and heart. With years of logistics experience and a vision to empower businesses,
              Otene leads the charge in transforming local delivery into a smooth, reliable, and smart experience.
            </p>
            <p className="text-gray-500 italic">
              “We don’t just deliver packages. We deliver trust, speed, and peace of mind.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

