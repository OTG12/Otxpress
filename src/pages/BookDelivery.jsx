import React, { useState } from "react";
import { createDispatch } from "../services/dispatch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Loader2,
  Truck,
  Box,
  MapPin,
  User,
  Target,
  CheckCircle,
  Clipboard,
  Smartphone,
  XCircle
} from "lucide-react";

const BookingPage = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    package_description: "",
    sender_name: "",
    sender_email: "",
    sender_phone_number: "",
    recipient_name: "",
    recipient_email: "",
    destination_phone_number: "",
    pickup_location: "",
    destination_location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      'package_description',
      'sender_name',
      'sender_email',
      'sender_phone_number',
      'recipient_name',
      'destination_phone_number',
      'pickup_location',
      'destination_location'
    ];

    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          border: "2px solid #ef4444"
        }
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.sender_email)) {
      toast.error("Please enter a valid sender email address", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          border: "2px solid #ef4444"
        }
      });
      return false;
    }

    if (formData.recipient_email && !emailRegex.test(formData.recipient_email)) {
      toast.error("Please enter a valid recipient email address", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          border: "2px solid #ef4444"
        }
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToastId = toast.loading("Creating your dispatch...", {
      position: "top-right",
      style: {
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        border: "2px solid #6b7280"
      }
    });

    try {
      const dispatch = await createDispatch(formData);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Display tracking ID
      setTrackingId(dispatch.tracking_id);

      // Success toast with custom styling (uses Truck icon)
      toast.success(
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Truck className="h-5 w-5" />
          <div>
            <div style={{ fontWeight: 600 }}>Dispatch created successfully</div>
            <div style={{ fontSize: 12 }}>Your tracking ID is: <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{dispatch.tracking_id}</span></div>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            border: "2px solid #10b981"
          }
        }
      );

      // Additional info toast (uses Smartphone icon)
      setTimeout(() => {
        toast.info(
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone className="h-5 w-5" />
            <div>Save your tracking ID to monitor your package!</div>
          </div>,
          {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              backgroundColor: "#1a1a1a",
              color: "#ffffff",
              border: "2px solid #3b82f6"
            }
          }
        );
      }, 1500);

      // Optional: redirect after delay
      // setTimeout(() => navigate("/dispatches"), 5000);

    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToastId);
      
      console.error(error);
      
      // Error toast with icon
      toast.error(
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <XCircle className="h-5 w-5" />
          <div>Failed to create dispatch. {error.message || 'Please try again.'}</div>
        </div>,
        {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            border: "2px solid #ef4444"
          }
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId).then(() => {
      toast.success(
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clipboard className="h-4 w-4" />
          <div>Tracking ID copied to clipboard!</div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            border: "2px solid #10b981"
          }
        }
      );
    }).catch(() => {
      toast.error(
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <XCircle className="h-4 w-4" />
          <div>Failed to copy tracking ID</div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          style: {
            backgroundColor: "#1a1a1a",
            color: "#ffffff",
            border: "2px solid #ef4444"
          }
        }
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 bg-white rounded shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Booking</h1>
        <p className="text-gray-600">...logistics made simple</p>
      </div>

      {trackingId && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-lg mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Booking Confirmed!
              </h3>
              <p className="text-sm mt-1">Your Tracking ID: <span className="font-mono font-bold text-lg">{trackingId}</span></p>
              <p className="text-xs mt-2 text-green-600">Keep this ID safe to track your package</p>
            </div>
            <button
              onClick={copyTrackingId}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              <Clipboard className="inline mr-2 h-4 w-4" />
              Copy ID
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Package */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Box className="mr-2 h-5 w-5" />
            Package Information
          </h2>
          <textarea
            name="package_description"
            value={formData.package_description}
            onChange={handleChange}
            placeholder="Describe your package (e.g., Documents, Electronics, Clothing, etc.)"
            className="border-2 border-gray-200 rounded-lg p-3 w-full mb-2 focus:border-red-500 focus:outline-none transition-colors duration-200"
            rows="3"
            required
          />
        </section>

        {/* Pickup & Destination */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Locations
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              placeholder="Pickup Location (Full Address)"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="text"
              name="destination_location"
              value={formData.destination_location}
              onChange={handleChange}
              placeholder="Destination Location (Full Address)"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
          </div>
        </section>

        {/* Sender */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Sender Information
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              name="sender_name"
              value={formData.sender_name}
              onChange={handleChange}
              placeholder="Sender Full Name"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="email"
              name="sender_email"
              value={formData.sender_email}
              onChange={handleChange}
              placeholder="Sender Email Address"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="tel"
              name="sender_phone_number"
              value={formData.sender_phone_number}
              onChange={handleChange}
              placeholder="Sender Phone Number"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
          </div>
        </section>

        {/* Recipient */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Recipient Information
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              name="recipient_name"
              value={formData.recipient_name}
              onChange={handleChange}
              placeholder="Recipient Full Name"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
            <input
              type="email"
              name="recipient_email"
              value={formData.recipient_email}
              onChange={handleChange}
              placeholder="Recipient Email Address (Optional)"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
            />
            <input
              type="tel"
              name="destination_phone_number"
              value={formData.destination_phone_number}
              onChange={handleChange}
              placeholder="Recipient Phone Number"
              className="border-2 border-gray-200 rounded-lg p-3 w-full focus:border-red-500 focus:outline-none transition-colors duration-200"
              required
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg transform hover:scale-105 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-red-200'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-3 h-5 w-5" />
              Creating Dispatch...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Truck className="mr-2 h-5 w-5" />
              Create Dispatch - 100% Reliable & Fast
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;