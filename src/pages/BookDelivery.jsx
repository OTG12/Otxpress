import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const BookDelivery = () => {
  const navigate = useNavigate();

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    pickupAddress: '',
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    packageType: '',
    packageWeight: '',
    deliveryOption: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      sender_name: formData.senderName,
      sender_phone: formData.senderPhone,
      pickup_address: formData.pickupAddress,
      receiver_name: formData.receiverName,
      receiver_phone: formData.receiverPhone,
      delivery_address: formData.deliveryAddress,
      package_type: formData.packageType,
      package_weight: formData.packageWeight,
      delivery_option: formData.deliveryOption,
    };

    const message = `*DELIVERY BOOKING* 🚚
📦 From: ${formData.senderName} (${formData.senderPhone})
📍 Pickup: ${formData.pickupAddress}
👤 To: ${formData.receiverName} (${formData.receiverPhone})
📍 Dropoff: ${formData.deliveryAddress}
📦 Type: ${formData.packageType}, Weight: ${formData.packageWeight}
🚀 Option: ${formData.deliveryOption}`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/2348120013544?text=${encodedMsg}`;
    setWhatsappLink(whatsappURL); // Store the WhatsApp link for modal

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setShowModal(true);
      setFormData({
        senderName: '',
        senderPhone: '',
        pickupAddress: '',
        receiverName: '',
        receiverPhone: '',
        deliveryAddress: '',
        packageType: '',
        packageWeight: '',
        deliveryOption: '',
      });

      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 6000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-12">
      {/* Red-black glowing background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#1a0000] to-red-700 opacity-90 -z-10" />
      <div className="absolute inset-0 backdrop-blur-sm -z-10" />

      {/* Form Box */}
      <div className="w-full max-w-xl bg-black/60 border border-red-700 rounded-xl shadow-xl p-6 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">📦 Book a Delivery</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'senderName', placeholder: "Sender's Name" },
            { name: 'senderPhone', placeholder: "Sender's Phone" },
            { name: 'pickupAddress', placeholder: 'Pickup Address' },
            { name: 'receiverName', placeholder: "Receiver's Name" },
            { name: 'receiverPhone', placeholder: "Receiver's Phone" },
            { name: 'deliveryAddress', placeholder: 'Delivery Address' },
            { name: 'packageType', placeholder: 'Package Type (e.g., Fragile)' },
            { name: 'packageWeight', placeholder: 'Weight (e.g., 2kg)' },
          ].map(({ name, placeholder }) => (
            <input
              key={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full p-3 bg-black/30 border border-red-500 placeholder-gray-300 rounded"
            />
          ))}

          <select
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black/30 border border-red-500 text-white rounded"
          >
            <option value="">Select Delivery Option</option>
            <option value="same-day">Same Day</option>
            <option value="next-day">Next Day</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-black font-semibold py-3 px-4 rounded transition"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-lg max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Delivery Booked!</h3>
            <p className="mb-2">✅ Your request has been sent via Email.</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              💬 Message Us on WhatsApp
            </a>
            <p className="mt-2 text-sm text-gray-600">You’ll be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDelivery;









