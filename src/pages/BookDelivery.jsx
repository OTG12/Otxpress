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
    deliveryOption: 'standard', // Set default value
  });
  const [showModal, setShowModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
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

      // 2. Prepare WhatsApp message (mobile-friendly URL)
      const whatsappMessage = `*NEW DELIVERY BOOKING*%0A%0A
📦 From: ${formData.senderName} (${formData.senderPhone})%0A
📍 Pickup: ${formData.pickupAddress}%0A
👤 To: ${formData.receiverName} (${formData.receiverPhone})%0A
📍 Delivery: ${formData.deliveryAddress}%0A
📦 Package: ${formData.packageType}, ${formData.packageWeight}%0A
🚚 Option: ${formData.deliveryOption.replace('_', ' ')}%0A
🔢 Tracking #: ${data.tracking_number}`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=2348120013544&text=${whatsappMessage}`;

      // 3. Send email notification with all details
      const emailTemplateParams = {
        sender_name: formData.senderName,
        sender_email: formData.senderEmail,
        sender_phone: formData.senderPhone,
        pickup_address: formData.pickupAddress,
        receiver_name: formData.receiverName,
        receiver_phone: formData.receiverPhone,
        delivery_address: formData.deliveryAddress,
        package_type: formData.packageType,
        package_weight: formData.packageWeight,
        delivery_option: formData.deliveryOption.replace('_', ' '),
        tracking_number: data.tracking_number,
        tracking_link: `${window.location.origin}/track/${data.tracking_number}`,
        booking_date: new Date().toLocaleDateString(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailTemplateParams,
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
        deliveryOption: 'standard',
      });

    } catch (error) {
      console.error('Booking error:', error);
      setIsLoading(false);
      alert(error.message || 'Failed to book delivery. Please try again.');
    }
  };

  // Mobile-friendly WhatsApp link handler
  const handleWhatsAppClick = (e) => {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // For mobile devices, open directly without target="_blank"
      window.location.href = trackingInfo.whatsappLink;
      e.preventDefault();
    }
    // For desktop, default <a> behavior with target="_blank" works fine
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 mt-[60px] md:mt-[64px]">
      {/* ... (keep your existing form JSX) ... */}

      {/* Success Modal */}
      {showModal && trackingInfo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black border border-red-700 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl">
            {/* ... (keep existing modal content) ... */}
            <a
              href={trackingInfo.whatsappLink}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded mb-2"
            >
              💬 Chat on WhatsApp
            </a>
            {/* ... (rest of modal) ... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDelivery;
