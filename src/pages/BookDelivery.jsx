import { useState } from "react";

const BookingPage = () => {
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
    totalCost: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        client: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Replace with actual client UUID
        rider: {
          username: "demo_rider",
          email: "rider@example.com",
          latitude: "6.5244", // Lagos sample
          longitude: "3.3792",
        },
        package_ids: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"], // Replace with actual package IDs
        total_cost: formData.totalCost || "1000",
        sender_name: formData.senderName,
        sender_email: formData.senderEmail,
        recipient_name: formData.receiverName,
        sender_phone_number: formData.senderPhone,
        pickup_location: {
          address: formData.pickupAddress,
          latitude: "6.5244",
          longitude: "3.3792",
        },
        pickup_location_id: 0,
        destination_location: {
          address: formData.deliveryAddress,
          latitude: "6.465422",
          longitude: "3.406448",
        },
        destination_location_id: 0,
        destination_phone_number: formData.receiverPhone,
        status: "PACKING",
        payment_status: false,
        duration: formData.deliveryOption,
      };

      const res = await fetch("http://127.0.0.1:8000/dispatch/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to create booking");

      setSuccess(`✅ Booking successful! Tracking ID: ${data.tracking_id}`);
      console.log("Booking response:", data);

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
        totalCost: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">📦 Create Booking</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <input
          type="text"
          name="senderName"
          placeholder="Sender Name"
          value={formData.senderName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="senderEmail"
          placeholder="Sender Email"
          value={formData.senderEmail}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="senderPhone"
          placeholder="Sender Phone"
          value={formData.senderPhone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="receiverName"
          placeholder="Receiver Name"
          value={formData.receiverName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="receiverPhone"
          placeholder="Receiver Phone"
          value={formData.receiverPhone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="packageType"
          placeholder="Package Type"
          value={formData.packageType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="packageWeight"
          placeholder="Package Weight (e.g., 2kg)"
          value={formData.packageWeight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="totalCost"
          placeholder="Total Cost"
          value={formData.totalCost}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="deliveryOption"
          value={formData.deliveryOption}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="standard">Standard (3-5 days)</option>
          <option value="express">Express (1-2 days)</option>
          <option value="same_day">Same Day</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;


