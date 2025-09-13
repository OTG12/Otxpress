// import React, { useRef, useEffect } from "react";
// import CardImg1 from "../assets/card1.jpeg";
// import CardImg2 from "../assets/card2.jpeg";
// import CardImg3 from "../assets/card3.jpeg";
// import CardImg4 from "../assets/card4.jpeg";
// import CardImg5 from "../assets/card5.jpeg";
// import CardImg6 from "../assets/card6.jpeg";

// const originalCards = [
//   {
//     id: 1,
//     image: CardImg1,
//     title: "Express Delivery",
//     description: "Get your package delivered in under 24 hours.",
//   },
//   {
//     id: 2,
//     image: CardImg2,
//     title: "Nationwide Coverage",
//     description: "We deliver across all 36 states.",
//   },
//   {
//     id: 3,
//     image: CardImg3,
//     title: "Affordable Rates",
//     description: "Enjoy great service without breaking the bank.",
//   },
//   {
//     id: 4,
//     image: CardImg4,
//     title: "Secure Packaging",
//     description: "We ensure your items are delivered safely.",
//   },
//   {
//     id: 5,
//     image: CardImg5,
//     title: "Real-Time Tracking",
//     description: "Know exactly where your package is anytime.",
//   },
//   {
//     id: 6,
//     image: CardImg6,
//     title: "Affordable Rates",
//     description: "Enjoy great service without breaking the bank.",
//   },
// ];

// // Duplicate cards for looping
// const cards = [...originalCards, ...originalCards];

// const GallerySlideshow = () => {
//   const scrollRef = useRef(null);
//   const isHovered = useRef(false);

//   useEffect(() => {
//     const container = scrollRef.current;
//     let scrollInterval;

//     const handleMouseEnter = () => (isHovered.current = true);
//     const handleMouseLeave = () => (isHovered.current = false);

//     if (container) {
//       container.addEventListener("mouseenter", handleMouseEnter);
//       container.addEventListener("mouseleave", handleMouseLeave);
//     }

//     const startAutoScroll = () => {
//       scrollInterval = setInterval(() => {
//         if (!container || isHovered.current) return;

//         const card = container.querySelector(".card");
//         if (!card) return;

//         const scrollStep = card.offsetWidth + 24;
//         const maxScrollLeft = container.scrollWidth / 2;

//         if (container.scrollLeft >= maxScrollLeft) {
//           container.scrollTo({ left: 0, behavior: "auto" });
//         } else {
//           container.scrollBy({ left: scrollStep, behavior: "smooth" });
//         }
//       }, 3000);
//     };

//     startAutoScroll();

//     return () => {
//       clearInterval(scrollInterval);
//       if (container) {
//         container.removeEventListener("mouseenter", handleMouseEnter);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, []);

//   return (
//     <section className="px-4 py-16 bg-[#0d0d0d]">
//       <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
//         Our Services
//       </h2>

//       <div className="relative">
//         <div
//           ref={scrollRef}
//           className="flex gap-6 overflow-x-auto scroll-smooth px-2 md:px-10 py-4 scrollbar-hide snap-x snap-mandatory"
//         >
//           {cards.map((card, index) => (
//             <div
//               key={`${card.id}-${index}`}
//               className="card snap-start flex-shrink-0 w-[85%] sm:w-[70%] md:w-1/3 bg-white rounded-2xl shadow-lg overflow-hidden relative group"
//             >
//               <img
//                 src={card.image}
//                 alt={card.title || "Service image"}
//                 className="w-full h-64 sm:h-72 md:h-80 object-cover"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
//                 <h3 className="text-xl font-semibold">{card.title}</h3>
//                 <p className="text-sm mt-1">{card.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GallerySlideshow;

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import CardImg1 from "../assets/card1.jpeg";
import CardImg2 from "../assets/card2.jpeg";
import CardImg3 from "../assets/card3.jpeg";
import CardImg4 from "../assets/card4.jpeg";
import CardImg5 from "../assets/card5.jpeg";
import CardImg6 from "../assets/card6.jpeg";

const services = [
  {
    id: 1,
    image: CardImg1,
    title: "Express Delivery",
    description: "24-hour guaranteed delivery with real-time tracking and priority handling.",
    icon: "🚀",
    features: ["Under 24 hours", "Real-time tracking", "Money-back guarantee"]
  },
  {
    id: 2,
    image: CardImg2,
    title: "Nationwide Coverage",
    description: "Reach all 36 states with our extensive logistics network and local partners.",
    icon: "🗺️",
    features: ["All 36 states", "Urban & rural areas", "Local partners"]
  },
  {
    id: 3,
    image: CardImg3,
    title: "Competitive Pricing",
    description: "Affordable rates without compromising on service quality or reliability.",
    icon: "💰",
    features: ["Transparent pricing", "No hidden fees", "Save up to 30%"]
  },
  {
    id: 4,
    image: CardImg4,
    title: "Secure Packaging",
    description: "Professional handling and insurance coverage for all your valuable items.",
    icon: "🛡️",
    features: ["Insured packages", "Professional handling", "Damage protection"]
  },
  {
    id: 5,
    image: CardImg5,
    title: "Real-Time Tracking",
    description: "Live GPS tracking with updates every 15 minutes and delivery notifications.",
    icon: "📍",
    features: ["Live GPS updates", "15-min intervals", "Delivery alerts"]
  },
  {
    id: 6,
    image: CardImg6,
    title: "Dedicated Support",
    description: "24/7 customer service with dedicated account managers for premium clients.",
    icon: "📞",
    features: ["24/7 availability", "Dedicated managers", "Quick resolution"]
  }
];

const GallerySlideshow = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector(".service-card");
    if (!card) return;
    
    const scrollPosition = index * (card.offsetWidth + 32);
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + services.length) % services.length;
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % services.length;
    scrollToCard(newIndex);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;

    if (autoPlay && !isHovered) {
      scrollInterval = setInterval(() => {
        handleNext();
      }, 4000);
    }

    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentIndex, isHovered, autoPlay]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-red-500 tracking-wider uppercase mb-4 block">
            Premium Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Redefining <span className="text-red-500">Logistics</span> Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of delivery with our cutting-edge services designed for modern businesses
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center mb-8 gap-4">
          <button
            onClick={toggleAutoPlay}
            className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full hover:bg-red-600 transition-colors duration-300"
            aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
          >
            {autoPlay ? (
              <FaPause className="text-white text-sm" />
            ) : (
              <FaPlay className="text-white text-sm" />
            )}
          </button>
          <span className="text-gray-400 text-sm">
            {autoPlay ? "Auto-scrolling" : "Manual control"}
          </span>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/90 backdrop-blur-md text-white p-4 rounded-full shadow-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 border border-gray-800"
            aria-label="Previous service"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/90 backdrop-blur-md text-white p-4 rounded-full shadow-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 border border-gray-800"
            aria-label="Next service"
          >
            <FaArrowRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth px-2 py-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-xl overflow-hidden relative group transition-all duration-500 hover:-translate-y-3 border border-gray-800 hover:border-red-500/30"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-5 right-5 bg-black/90 backdrop-blur-sm text-2xl p-3 rounded-xl shadow-lg border border-gray-700 group-hover:border-red-500 transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Quick features badge */}
                  <div className="absolute top-5 left-5">
                    <div className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {service.features.length} key features
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                  
                  {/* Feature highlights */}
                  <div className="mb-5">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-400 mb-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                    {service.features.length > 2 && (
                      <div className="text-sm text-gray-500">
                        +{service.features.length - 2} more features
                      </div>
                    )}
                  </div>
                  
                  {/* Updated Learn More button with Link */}
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-red-500 font-medium group-hover:text-red-400 transition-colors duration-300"
                  >
                    Explore Service
                    <FaChevronRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators and Progress */}
        <div className="mt-12">
          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4 overflow-hidden">
            <div 
              className="bg-red-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-8 bg-red-500 rounded-lg' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Counter */}
            <div className="text-gray-400 text-sm">
              {currentIndex + 1} / {services.length}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default GallerySlideshow;





