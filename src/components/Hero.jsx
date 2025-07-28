import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const images = ["/Hero1.jpeg", "/Hero2.jpeg", "/Hero3.jpeg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);

  // Image transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 500); // Matches the CSS transition duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] pt-[12rem] -mt-[5.25rem] flex items-center justify-center overflow-hidden">
      {/* Background images with fade transition */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            currentImage === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Hero background ${index + 1}`}
            className="w-full h-full object-cover object-center brightness-[0.5]"
          />
        </div>
      ))}

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#1f1a17]/60 mix-blend-multiply"></div>

      {/* Text Content with animation */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white animate-fadeIn">
        <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide leading-tight">
          Logistics Made Simple!
        </h1>
        <h3 className="mb-6 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide leading-tight text-yellow-300">
          Reliable Delivery, Rooted in Trust.
        </h3>
        <p className="mb-8 text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto">
          Logistics you can count on - fast, secure, and nationwide. We're here
          to make your deliveries smooth and stress-free.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/bookdelivery"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-[#ffcc00] rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
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
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setFade(true);
              setTimeout(() => {
                setCurrentImage(index);
                setFade(false);
              }, 500);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentImage === index ? 'bg-yellow-400 w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;















