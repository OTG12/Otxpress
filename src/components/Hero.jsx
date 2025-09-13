import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const images = ["/Hero1.jpeg", "/Hero2.jpeg", "/Hero3.jpeg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Image transition effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 800); // Matches the CSS transition duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    if (index === currentImage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(index);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background images with smooth transition */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              currentImage === index 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            } ${isTransitioning ? 'transitioning' : ''}`}
          >
            <img
              src={image}
              alt={`Premium logistics service ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Stronger gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 text-center text-white">
        <div className="mb-8">
          <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none drop-shadow-2xl">
            Logistics Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white">Simple</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-8 tracking-wide drop-shadow-md">
            Reliable Delivery, Rooted in Trust
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Premium logistics you can count on  fast, secure, and nationwide. 
            Experience delivery redefined with cutting-edge technology and unparalleled service.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
          <Link
            to="/bookdelivery"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <svg
              className="w-5 h-5 ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
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
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white/40 rounded-2xl hover:border-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm shadow-lg"
          >
            <span className="relative z-10">Contact Us</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-gray-300 text-sm mt-2 font-medium">Scroll to explore</p>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === index 
                ? 'bg-yellow-400 w-8 rounded-lg' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slower"></div>

      {/* Additional dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  );
};

export default Hero;















