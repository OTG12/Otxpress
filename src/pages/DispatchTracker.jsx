import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.jpeg";

const DispatchTracker = () => {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [dispatchData, setDispatchData] = useState(null);
  const [error, setError] = useState(null);
  const [locationInterval, setLocationInterval] = useState(null);

  // Handle Enter key in search input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        searchDispatch();
      }
    };

    const input = document.getElementById('trackingInput');
    if (input) {
      input.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      if (input) {
        input.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [trackingId]);

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
      }
    };
  }, [locationInterval]);

  const searchDispatch = async () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/dispatch/search/${trackingId}`);
      if (!response.ok) {
        throw new Error('Dispatch not found');
      }
      
      const data = await response.json();
      setDispatchData(data[0]);
      startLocationTracking();
    } catch (err) {
      setError(`Package not found: ${trackingId}`);
      setDispatchData(null);
    } finally {
      setLoading(false);
    }
  };

  const startLocationTracking = () => {
    // Clear any existing interval
    if (locationInterval) {
      clearInterval(locationInterval);
    }

    // Update location immediately
    updateLiveLocation();

    // Set up polling for live location updates every 10 seconds
    const interval = setInterval(updateLiveLocation, 10000);
    setLocationInterval(interval);
  };

  const updateLiveLocation = async () => {
    if (!dispatchData || !dispatchData.rider) {
      return;
    }

    try {
      // Fetch updated dispatch data to get rider's current location
      const response = await fetch(`http://127.0.0.1:8000/dispatch/search/${dispatchData.tracking_id}`);
      if (!response.ok) return;
      
      const data = await response.json();
      const updatedDispatch = data[0];
      
      // Update current dispatch data
      setDispatchData(updatedDispatch);
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 font-sans pt-16 md:pt-20">
      {/* Header */}
      <div className="bg-black py-3 md:py-5 shadow-md shadow-red-100 fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 md:px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            {/* Logo and Home Link */}
            <Link to="/" className="flex items-center h-12 md:h-16">
              <img 
                src={Logo} 
                alt="OTxpress" 
                className="h-full w-auto object-contain"
              />
            </Link>
            
            {/* Search Section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 w-full md:w-auto md:flex-1 md:mx-4">
              <input 
                type="text" 
                id="trackingInput"
                className="px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg text-base w-full md:min-w-[250px] focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                placeholder="Enter tracking ID (e.g., TRK-A6GARII3)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button 
                onClick={searchDispatch} 
                className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-base w-full md:w-auto hover:bg-red-700 active:translate-y-[1px] transition-all"
              >
                Track Package
              </button>
            </div>
            
            {/* Home Button - Hidden on mobile, shown on desktop */}
            <Link 
              to="/" 
              className="hidden md:block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-base hover:bg-gray-300 transition-all whitespace-nowrap"
            >
              Back to Home
            </Link>
            
            {/* Mobile Home Link */}
            <Link 
              to="/" 
              className="md:hidden text-white text-sm mt-2"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-5 pt-6 md:pt-8 pb-12 md:pb-16">
        {loading && (
          <div className="text-center py-5 text-red-600">
            <div className="spinner border-4 border-gray-200 border-t-red-600 rounded-full w-8 h-8 mx-auto mb-3 animate-spin"></div>
            <p>Searching for your package...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-800 py-4 px-5 rounded-lg text-center">
            <h3 className="text-lg font-semibold">⚠️ {error}</h3>
            <p className="mt-1">Please check your tracking ID and try again.</p>
          </div>
        )}
        
        {dispatchData && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6 md:gap-8 items-start">
            {/* Map Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px] md:h-[500px] relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-gray-500 p-4">
                <div className="w-5 h-5 bg-red-600 rounded-full my-3 animate-pulse"></div>
                <h3 className="text-xl font-semibold mb-2 text-center">Live Tracking Map</h3>
                <p className="text-center">Package location will be displayed here</p>
                {dispatchData.rider && (
                  <div className="p-4 md:p-5 text-center mt-4 w-full">
                    {dispatchData.rider.latitude && dispatchData.rider.longitude ? (
                      <>
                        <div className="w-5 h-5 bg-red-600 rounded-full my-3 mx-auto animate-pulse"></div>
                        <h3 className="text-red-600 font-semibold mb-4">📍 Live Location</h3>
                        <div className="bg-red-50 p-3 md:p-4 rounded-lg mb-4">
                          <strong>Rider: {dispatchData.rider.username}</strong><br />
                          <small className="text-gray-500">{dispatchData.rider.email}</small>
                        </div>
                        <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
                          <div className="text-red-600 font-bold mb-2">Current Coordinates:</div>
                          <div className="font-mono text-xs md:text-sm">
                            Lat: {dispatchData.rider.latitude}<br />
                            Lng: {dispatchData.rider.longitude}
                          </div>
                        </div>
                        <div className="mt-3 md:mt-4 text-xs text-gray-500">
                          🔄 Updates every 10 seconds
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 bg-gray-500 rounded-full my-3 mx-auto"></div>
                        <h3 className="text-gray-500 font-semibold mb-4">📍 Location Tracking</h3>
                        <div className="bg-gray-100 p-3 md:p-4 rounded-lg mb-4">
                          <strong>Rider: {dispatchData.rider.username}</strong><br />
                          <small className="text-gray-500">{dispatchData.rider.email}</small>
                        </div>
                        <div className="text-gray-500 text-sm">
                          📡 Waiting for location data...<br />
                          <small>Rider's GPS will appear here once available</small>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Info Panel */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white py-4 md:py-5 px-4 md:px-6 text-center">
                <h2 className="text-lg md:text-xl font-semibold mb-2">Dispatch Details</h2>
                <div className="font-mono text-sm md:text-base opacity-90">{dispatchData.tracking_id}</div>
              </div>
              <div className="p-4 md:p-6">
                <div className="inline-block bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase mb-4 md:mb-5">
                  {dispatchData.status}
                </div>
                
                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Sender Information</div>
                  <div className="text-gray-700 text-sm">
                    {dispatchData.sender_email}<br />
                    {dispatchData.sender_phone_number || 'Phone not provided'}
                  </div>
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Recipient Information</div>
                  <div className="text-gray-700 text-sm">
                    {dispatchData.recipient_name || 'Name not provided'}<br />
                    {dispatchData.destination_phone_number}
                  </div>
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Pickup Location</div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="text-gray-700 text-sm">{dispatchData.pickup_location.address}</div>
                  </div>
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Destination</div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full flex-shrink-0"></div>
                    <div className="text-gray-700 text-sm">{dispatchData.destination_location.address}</div>
                  </div>
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Package Details</div>
                  {dispatchData.package.map((pkg, index) => (
                    <div key={index} className="bg-gray-50 p-3 md:p-4 rounded-lg border-l-4 border-red-600 mb-3 md:mb-4">
                      <div className="font-semibold text-red-600 mb-2 text-sm md:text-base">Package {index + 1}: {pkg.description}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div><strong>Weight:</strong> {pkg.weight}kg</div>
                        <div><strong>Cost:</strong> ₦{parseFloat(pkg.cost).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Total Cost</div>
                  <div className="text-lg font-bold text-red-600">₦{parseFloat(dispatchData.total_cost).toLocaleString()}</div>
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Order Date</div>
                  <div className="text-gray-700 text-sm">{new Date(dispatchData.created_at).toLocaleString()}</div>
                </div>

                <div className="mb-4 md:mb-5">
                  <div className="font-semibold text-red-600 text-sm mb-1">Payment Status</div>
                  <div className={`text-sm ${dispatchData.payment_status ? 'text-green-600' : 'text-red-600'}`}>
                    {dispatchData.payment_status ? '✓ Paid' : '✗ Unpaid'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DispatchTracker;