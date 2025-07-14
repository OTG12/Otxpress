import React, { useEffect, useState } from "react";
import Hero1 from "../assets/Hero1.jpg";
import Hero2 from "../assets/Hero2.jpg";
import Hero3 from "../assets/Hero3.jpg";

const Hero = () => {
  const images = [Hero1, Hero2, Hero3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={images[currentImage]}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-75 transition-all duration-1000"
      />

      {/* Text Content */}
      <div className="relative z-10 max-w-screen-xl px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
          Fast and Reliable Delivery Services
        </h1>
        <p className="mb-6 font-light text-lg md:text-xl">
          From same-day local drop-offs to nationwide logistics, our platform
          helps businesses and individuals get their packages delivered quickly,
          safely, and affordably.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
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
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white border border-white rounded-lg hover:bg-white hover:text-black"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;









