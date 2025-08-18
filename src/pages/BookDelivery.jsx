import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const BookDelivery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
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
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Send booking to backend
      const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_name: formData.senderName,
          sender_email: formData.senderEmail,
          sender_phone: formData.senderPhone,
          pickup_address: formData.pickupAddress,
          receiver_name: formData.receiverName,
          receiver_phone: formData.receiverPhone,
          delivery_address: formData.deliveryAddress,
          package_type: formData.packageType,
          package_weight: formData.packageWeight,
          delivery_option: formData.deliveryOption,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Booking failed');

      // 2. Prepare WhatsApp message
      const whatsappMessage = `*NEW DELIVERY BOOKING* 🚀
📦 From: ${formData.senderName} (${formData.senderPhone})
📍 Pickup: ${formData.pickupAddress}
👤 To: ${formData.receiverName} (${formData.receiverPhone})
📍 Delivery: ${formData.deliveryAddress}
📦 Package: ${formData.packageType}, ${formData.packageWeight}
🚚 Option: ${formData.deliveryOption}
🔢 Tracking #: ${data.tracking_number}`;

      const encodedMsg = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/2348120013544?text=${encodedMsg}`;

      // 3. Send email notification
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          ...formData,
          tracking_number: data.tracking_number,
          tracking_link: `http://yourdomain.com/track/${data.tracking_number}/`
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 4. Show success
      setTrackingInfo({
        number: data.tracking_number,
        whatsappLink: whatsappURL
      });
      setShowModal(true);
      setIsLoading(false);

      // Reset form
      setFormData({
        senderName: '',
        senderEmail: '',
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
      console.error('Booking error:', error);
      setIsLoading(false);
      alert(error.message || 'Failed to book delivery. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 mt-[60px] md:mt-[64px]">
      <div className="w-full max-w-xl bg-black border border-red-700 rounded-xl shadow-xl p-6 text-red-500">
        <h2 className="text-3xl font-bold text-center mb-6">📦 Book a Delivery</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'senderName', placeholder: "Sender's Name" },
            { name: 'senderEmail', placeholder: "Sender's Email", type: 'email' },
            { name: 'senderPhone', placeholder: "Sender's Phone", type: 'tel' },
            { name: 'pickupAddress', placeholder: 'Pickup Address', type: 'text' },
            { name: 'receiverName', placeholder: "Receiver's Name" },
            { name: 'receiverPhone', placeholder: "Receiver's Phone", type: 'tel' },
            { name: 'deliveryAddress', placeholder: 'Delivery Address' },
            { name: 'packageType', placeholder: 'Package Type (e.g., Fragile)' },
            { name: 'packageWeight', placeholder: 'Weight (e.g., 2kg)' },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full p-3 bg-black border border-red-500 text-red-500 placeholder-red-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}

          <select
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-red-500 text-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Delivery Option</option>
            <option value="same_day">Same Day</option>
            <option value="next_day">Next Day</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? 'bg-gray-800' : 'bg-red-500 hover:bg-red-600'
            } text-black font-semibold py-3 px-4 rounded transition`}
          >
            {isLoading ? 'Processing...' : 'Book Delivery'}
          </button>
        </form>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-red-500 text-lg">Processing your booking...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showModal && trackingInfo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black border border-red-700 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Booking Confirmed!</h3>
            <p className="mb-4 text-red-400">Your delivery has been scheduled successfully.</p>
            
            <div className="bg-black border border-red-500 p-3 mb-4 rounded">
              <p className="text-red-500 font-mono text-lg">Tracking Number:</p>
              <p className="text-red-500 font-bold text-xl">{trackingInfo.number}</p>
            </div>

            <p className="mb-4 text-red-400">Details have been sent to your email.</p>
            
            <a
              href={trackingInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded mb-2"
            >
              💬 Chat on WhatsApp
            </a>
            
            <button
              onClick={() => {
                setShowModal(false);
                navigate('/');
              }}
              className="w-full bg-black border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDelivery;
