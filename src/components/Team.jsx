import React from 'react';
import Ceo from '../assets/Ceo.jpeg';
import Co1 from '../assets/Co1.jpeg';

const Team = () => {
  const teamMembers = [
    {
      name: "Otene Success",
      role: "CEO/Co-founder",
      image: Ceo, // use the imported image variable
    },
    {
      name: "Helene Engels",
      role: "CTO/Co-founder",
      image: Co1, // use the imported image variable
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our team
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Explore the whole collection of open-source web components and elements built with the utility classes from Tailwind
          </p>
        </div>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center text-gray-500 dark:text-gray-400">
              <img className="mx-auto mb-4 w-80 h-80 object-cover rounded-lg" src={member.image} alt={`${member.name} Avatar`} />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{member.name}</a>
              </h3>
              <p>{member.role}</p>
              {/* Social icons block remains unchanged */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
