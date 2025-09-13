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
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
    description: "Get your package delivered in under 24 hours with our priority service.",
    icon: "🚀"
  },
  {
    id: 2,
    image: CardImg2,
    title: "Nationwide Coverage",
    description: "We deliver to all 36 states with our extensive logistics network.",
    icon: "🗺️"
  },
  {
    id: 3,
    image: CardImg3,
    title: "Competitive Pricing",
    description: "Affordable rates without compromising on service quality.",
    icon: "💰"
  },
  {
    id: 4,
    image: CardImg4,
    title: "Secure Packaging",
    description: "Professional handling and packaging to ensure safe delivery.",
    icon: "🛡️"
  },
  {
    id: 5,
    image: CardImg5,
    title: "Real-Time Tracking",
    description: "Live GPS tracking with updates every 15 minutes.",
    icon: "📍"
  },
  {
    id: 6,
    image: CardImg6,
    title: "Dedicated Support",
    description: "24/7 customer service for all your delivery needs.",
    icon: "📞"
  }
];

const GallerySlideshow = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector(".card");
    if (!card) return;
    
    const scrollPosition = index * (card.offsetWidth + 24);
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

  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!container || isHovered) return;
        handleNext();
      }, 4000);
    };

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentIndex, isHovered]);

  return (
    <section className="px-4 py-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-red-500">
          Our Premium Services
        </h2>
        <p className="text-xl text-center text-red-400 mb-12 max-w-3xl mx-auto">
          Delivering excellence through every step of your logistics journey
        </p>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 -ml-4 border border-red-600"
            aria-label="Previous service"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 -mr-4 border border-red-600"
            aria-label="Next service"
          >
            <FaArrowRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4 scrollbar-hide"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="card flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] bg-gray-900 rounded-2xl shadow-lg overflow-hidden relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-red-600"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black text-2xl p-2 rounded-lg shadow-md border border-red-500">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-red-400">{service.description}</p>
                  <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? 'bg-red-500 w-6' : 'bg-gray-700'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlideshow;





