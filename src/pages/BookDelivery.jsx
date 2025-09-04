import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    pickupAddress: "",
    receiverName: "",
    receiverPhone: "",
    deliveryAddress: "",
    packageType: "",
    packageWeight: "",
    deliveryOption: "standard",
  });
  const [showModal, setShowModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send booking to Django API
      const response = await fetch("http://127.0.0.1:8000/dispatch/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      if (!response.ok) throw new Error(data.message || "Booking failed");

      // WhatsApp message
      const whatsappMessage = `*NEW DELIVERY BOOKING*%0A%0A📦 From: ${formData.senderName} (${formData.senderPhone})%0A📍 Pickup: ${formData.pickupAddress}%0A👤 To: ${formData.receiverName} (${formData.receiverPhone})%0A📍 Delivery: ${formData.deliveryAddress}%0A📦 Package: ${formData.packageType}, ${formData.packageWeight}%0A🚚 Option: ${formData.deliveryOption.replace("_", " ")}%0A🔢 Tracking #: ${data.tracking_number}`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=2348120013544&text=${whatsappMessage}`;

      // Send email notification
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          ...formData,
          tracking_number: data.tracking_number,
          tracking_link: `${window.location.origin}/track/${data.tracking_number}`,
          booking_date: new Date().toLocaleDateString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setTrackingInfo({
        number: data.tracking_number,
        whatsappLink: whatsappURL,
      });
      setShowModal(true);
      setIsLoading(false);

      // Reset form
      setFormData({
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        pickupAddress: "",
        receiverName: "",
        receiverPhone: "",
        deliveryAddress: "",
        packageType: "",
        packageWeight: "",
        deliveryOption: "standard",
      });
    } catch (error) {
      console.error("Booking error:", error);
      setIsLoading(false);
      alert(error.message || "Failed to book delivery. Please try again.");
    }
  };

  const handleWhatsAppClick = (e) => {
    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.location.href = trackingInfo.whatsappLink;
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-24">
      {/* Booking Form */}
      <div className="w-full max-w-md sm:max-w-xl bg-black border border-red-700 rounded-xl shadow-xl p-6 text-red-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          📦 Book a Delivery
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {[
            { name: "senderName", placeholder: "Sender's Name" },
            { name: "senderEmail", placeholder: "Sender's Email", type: "email" },
            { name: "senderPhone", placeholder: "Sender's Phone", type: "tel" },
            { name: "pickupAddress", placeholder: "Pickup Address", type: "text" },
            { name: "receiverName", placeholder: "Receiver's Name" },
            { name: "receiverPhone", placeholder: "Receiver's Phone", type: "tel" },
            { name: "deliveryAddress", placeholder: "Delivery Address" },
            { name: "packageType", placeholder: "Package Type (e.g., Fragile)" },
            { name: "packageWeight", placeholder: "Weight (e.g., 2kg)" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full p-2 sm:p-3 text-sm sm:text-base bg-black border border-red-500 text-red-500 placeholder-red-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}

          <select
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            required
            className="w-full p-2 sm:p-3 text-sm sm:text-base bg-black border border-red-500 text-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Delivery Option</option>
            <option value="standard">Standard (3-5 days)</option>
            <option value="express">Express (1-2 days)</option>
            <option value="same_day">Same Day</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-sm sm:text-base ${
              isLoading ? "bg-gray-800" : "bg-red-500 hover:bg-red-600"
            } text-black font-semibold py-2 sm:py-3 px-4 rounded transition`}
          >
            {isLoading ? "Processing..." : "Book Delivery"}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && trackingInfo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-red-700 p-6 sm:p-8 rounded-lg w-full max-w-xs sm:max-w-sm text-center shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4">
              Booking Confirmed!
            </h3>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-red-400">
              Your delivery has been scheduled.
            </p>

            <div className="bg-black border border-red-500 p-2 sm:p-3 mb-3 sm:mb-4 rounded">
              <p className="text-red-500 text-sm sm:text-lg">Tracking Number:</p>
              <p className="text-red-500 font-bold text-base sm:text-xl">
                {trackingInfo.number}
              </p>
            </div>

            <p className="mb-3 sm:mb-4 text-sm sm:text-base text-red-400">
              Details sent to your email.
            </p>

            <a
              href={trackingInfo.whatsappLink}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-sm sm:text-base bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded mb-2"
            >
              💬 Chat on WhatsApp
            </a>

            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="w-full text-sm sm:text-base bg-black border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
