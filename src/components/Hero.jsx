import React, { useEffect, useState } from "react";

const Hero = () => {
  const images = ["/Hero1.jpeg", "/Hero2.jpeg", "/Hero3.jpeg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] pt-[12rem] -mt-[5.25rem] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={images[currentImage]}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.5] transition-opacity duration-1000"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#1f1a17]/60 mix-blend-multiply"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <h1 className="mb-6 text-5xl md:text-5xl font-extrabold tracking-wide leading-tight">
          Logistics Made Simple!
        </h1>
         <h3 className="mb-6 text-2xl md:text-2xl font-extrabold tracking-wide leading-tight">
          Reliable Delivery, Rooted in Trust.
        </h3>
        <p className="mb-8 text-lg md:text-xl font-light text-gray-200">
          Logistics you can count on fast, secure, and nationwide. We’re here
          to make your deliveries smooth and stress free.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-[#ffcc00] rounded-lg hover:bg-yellow-400 transition"
          >
            Get Started
            <svg
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border border-white rounded-lg hover:bg-white hover:text-black transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;















