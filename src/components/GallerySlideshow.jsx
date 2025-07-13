import React, { useRef, useEffect } from "react";
import CardImg1 from "../assets/card1.jpg";
import CardImg2 from "../assets/card2.jpg";
import CardImg3 from "../assets/card3.jpg";
import CardImg4 from "../assets/card4.jpg";
import CardImg5 from "../assets/card5.jpg";

const originalCards = [
  {
    id: 1,
    image: CardImg1,
    title: "Express Delivery",
    description: "Get your package delivered in under 24 hours.",
  },
  {
    id: 2,
    image: CardImg2,
    title: "Nationwide Coverage",
    description: "We deliver across all 36 states.",
  },
  {
    id: 3,
    image: CardImg3,
    title: "Affordable Rates",
    description: "Enjoy great service without breaking the bank.",
  },
  {
    id: 4,
    image: CardImg4,
    title: "Secure Packaging",
    description: "We ensure your items are delivered safely.",
  },
  {
    id: 5,
    image: CardImg5,
    title: "Real-Time Tracking",
    description: "Know exactly where your package is anytime.",
  },
];

// Duplicate cards for looping
const cards = [...originalCards, ...originalCards];

const GallerySlideshow = () => {
  const scrollRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!container) return;

        // Scroll by width of one card
        const card = container.querySelector(".card");
        if (!card) return;

        const scrollStep = card.offsetWidth + 24; // 24 is tailwind gap-6
        container.scrollBy({ left: scrollStep, behavior: "smooth" });

        // Loop back to start
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - scrollStep
        ) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "auto" });
          }, 600);
        }
      }, 3000);
    };

    startAutoScroll();
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="px-6 py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Our Services
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-2 md:px-10 py-2 scrollbar-hide snap-x snap-mandatory"
        >
          {cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="card snap-start flex-shrink-0 w-[90%] sm:w-[70%] md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden relative group"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlideshow;




