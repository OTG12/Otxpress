import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const BookDelivery = () => {
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


    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert('Delivery booked successfully!');
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
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Book a Delivery</h2>
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
            className="w-full p-2 border rounded"
          />
        ))}

        <select
          name="deliveryOption"
          value={formData.deliveryOption}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Delivery Option</option>
          <option value="same-day">Same Day</option>
          <option value="next-day">Next Day</option>
          <option value="scheduled">Scheduled</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookDelivery;




