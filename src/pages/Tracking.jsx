import React from 'react'
import { useState } from 'react';

const Tracking = () => {
    const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();

    // Fake status for demo purposes — you’ll replace this with a real API later
    if (trackingId === "123456") {
      setStatus("📦 Your package is out for delivery.");
    } else if (trackingId === "999999") {
      setStatus("✅ Package delivered.");
    } else {
      setStatus("❌ Tracking ID not found.");
    }
  };

  return (
    <div className="pt-20 px-4 pb-16 bg-gray-50 min-h-screen  mt-[60px] md:mt-[64px]">
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Track Your Package</h1>
        <form onSubmit={handleTrack} className="space-y-4">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Track
          </button>
        </form>

        {status && (
          <div className="mt-6 text-center text-lg font-medium text-gray-800">
            {status}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tracking