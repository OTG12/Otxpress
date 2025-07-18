import React, { useRef, useEffect } from "react";
import CardImg1 from "../assets/card1.jpeg";
import CardImg2 from "../assets/card2.jpeg";
import CardImg3 from "../assets/card3.jpeg";
import CardImg4 from "../assets/card4.jpeg";
import CardImg5 from "../assets/card5.jpeg";
import CardImg6 from "../assets/card6.jpeg";

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
  {
    id: 6,
    image: CardImg6,
    title: "Affordable Rates",
    description: "Enjoy great service without breaking the bank.",
  },
];

// Duplicate cards for looping
const cards = [...originalCards, ...originalCards];

const GallerySlideshow = () => {
  const scrollRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;

    const handleMouseEnter = () => (isHovered.current = true);
    const handleMouseLeave = () => (isHovered.current = false);

    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!container || isHovered.current) return;

        const card = container.querySelector(".card");
        if (!card) return;

        const scrollStep = card.offsetWidth + 24;
        const maxScrollLeft = container.scrollWidth / 2;

        if (container.scrollLeft >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: "auto" });
        } else {
          container.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="px-4 py-16 bg-[#0d0d0d]">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
        Our Services
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-2 md:px-10 py-4 scrollbar-hide snap-x snap-mandatory"
        >
          {cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="card snap-start flex-shrink-0 w-[85%] sm:w-[70%] md:w-1/3 bg-white rounded-2xl shadow-lg overflow-hidden relative group"
            >
              <img
                src={card.image}
                alt={card.title || "Service image"}
                className="w-full h-64 sm:h-72 md:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm mt-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlideshow;





