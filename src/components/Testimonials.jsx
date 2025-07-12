import React from 'react'

const Testimonials = () => {
  return (
       <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p>"Super fast delivery! I use this service weekly and they never disappoint."</p>
          <p className="mt-4 font-semibold">– Ada, Lagos</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p>"The tracking feature is a game changer. I always know where my package is."</p>
          <p className="mt-4 font-semibold">– Chinedu, Abuja</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <p>"Affordable and reliable. Great customer service too!"</p>
          <p className="mt-4 font-semibold">– Zainab, Port Harcourt</p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials