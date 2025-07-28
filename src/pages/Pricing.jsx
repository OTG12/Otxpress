import React from "react";

const plans = [
  {
    name: "Basic",
    price: "₦1,500",
    description: "For personal deliveries within the city.",
    features: ["1 Package per day", "Same-day delivery", "Live tracking"],
    bg: "bg-black bg-opacity-30 border border-red-500",
  },
  {
    name: "Pro",
    price: "₦4,500",
    description: "Best for small business owners.",
    features: ["Up to 5 Packages/day", "Priority Support", "Live tracking"],
    bg: "bg-red-700 bg-opacity-90 border border-white",
  },
  {
    name: "Business",
    price: "₦10,000",
    description: "Ideal for companies with daily shipping needs.",
    features: [
      "Unlimited deliveries",
      "Dedicated rider",
      "Customer dashboard access",
    ],
    bg: "bg-black bg-opacity-30 border border-red-500",
  },
];

const PricingPage = () => {
  return (
    <section className="relative min-h-screen py-20 px-6 text-white overflow-hidden">
      {/* Red & Black background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#1a0000] to-red-700 opacity-90 -z-10" />
      <div className="absolute inset-0 backdrop-blur-sm -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4">Our Pricing Plans</h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Choose a plan that fits your delivery needs. Transparent pricing. No hidden fees.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 shadow-lg hover:scale-[1.03] transition duration-300 ${plan.bg}`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
              <p className="mb-6 text-sm text-gray-300 italic">{plan.description}</p>

              <ul className="text-left space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPage;


