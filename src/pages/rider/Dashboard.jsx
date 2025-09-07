import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RiderDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [deliveryHistory, setDeliveryHistory] = useState([]);
  const [currentDeliveries, setCurrentDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for delivery history
        const mockDeliveries = [
          { 
            id: 1, 
            trackingId: "DLV-001", 
            pickup: "Lagos Island Warehouse", 
            delivery: "Ikeja Customer", 
            date: "01 Sept 2025", 
            status: "delivered", 
            earnings: "₦1,500",
            packageType: "Document",
            weight: "0.5kg"
          },
          { 
            id: 2, 
            trackingId: "DLV-002", 
            pickup: "Lekki Distribution Center", 
            delivery: "Victoria Island Office", 
            date: "28 Aug 2025", 
            status: "delivered", 
            earnings: "₦2,000",
            packageType: "Parcel",
            weight: "2kg"
          },
          { 
            id: 3, 
            trackingId: "DLV-003", 
            pickup: "Surulere Depot", 
            delivery: "Yaba Retail Store", 
            date: "25 Aug 2025", 
            status: "delivered", 
            earnings: "₦1,800",
            packageType: "Package",
            weight: "5kg"
          }
        ];

        // Mock current deliveries
        const mockCurrentDeliveries = [
          {
            id: 4,
            trackingId: "DLV-004",
            pickup: "Apapa Port",
            delivery: "Gbagada Customer",
            status: "in-transit",
            estimatedTime: "45 min",
            packageType: "Urgent Document",
            priority: "high"
          }
        ];

        setDeliveryHistory(mockDeliveries);
        setCurrentDeliveries(mockCurrentDeliveries);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("rider");
    if (onLogout) {
      onLogout();
    }
    navigate("/rider");
  };

  const stats = [
    { label: "Total Deliveries", value: "156", icon: "📦", trend: "+12% this week" },
    { label: "Completed", value: "148", icon: "✅", trend: "94% success rate" },
    { label: "Total Earnings", value: "₦287,500", icon: "💰", trend: "₦45,800 this month" },
    { label: "Customer Rating", value: "4.8/5", icon: "⭐", trend: "From 132 reviews" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "in-transit": return "bg-blue-100 text-blue-800";
      case "pickup-pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Delivery Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Rider ID: {user?.riderId || "RDR-001"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{stat.icon}</span>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Current Deliveries */}
        {currentDeliveries.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-orange-800">🚚 Active Deliveries</h2>
            <div className="space-y-4">
              {currentDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">Tracking: {delivery.trackingId}</p>
                      <p className="text-sm text-gray-600">{delivery.pickup} → {delivery.delivery}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span> {delivery.packageType}
                    </div>
                    <div>
                      <span className="text-gray-600">ETA:</span> {delivery.estimatedTime}
                    </div>
                    <div>
                      <span className="text-gray-600">Priority:</span>
                      <span className={`ml-1 ${delivery.priority === 'high' ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                        {delivery.priority}
                      </span>
                    </div>
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <nav className="flex border-b">
            {["overview", "deliveries", "earnings", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </nav>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Link
                    to="/bookdelivery"
                    className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition-colors"
                  >
                    📦 New Delivery Pickup
                  </Link>
                  <Link
                    to="/dispatchtracker"
                    className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition-colors"
                  >
                    📍 Track Package
                  </Link>
                  <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors">
                    💰 View Today's Earnings
                  </button>
                </div>

                <h2 className="text-xl font-semibold mb-4">Recent Deliveries</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading delivery history...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deliveryHistory.slice(0, 5).map((delivery) => (
                      <div key={delivery.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{delivery.pickup} → {delivery.delivery}</p>
                            <p className="text-sm text-gray-600">
                              {delivery.trackingId} • {delivery.date} • {delivery.packageType} ({delivery.weight})
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(delivery.status)}`}>
                              {delivery.status}
                            </span>
                            <p className="text-sm font-semibold text-green-600">{delivery.earnings}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "deliveries" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Delivery History</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading delivery history...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {deliveryHistory.map((delivery) => (
                          <tr key={delivery.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                              {delivery.trackingId}
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium">{delivery.pickup}</div>
                                <div className="text-sm text-gray-600">→ {delivery.delivery}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{delivery.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {delivery.packageType} ({delivery.weight})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(delivery.status)}`}>
                                {delivery.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                              {delivery.earnings}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "earnings" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Earnings Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800">Today's Earnings</h3>
                    <p className="text-2xl font-bold">₦8,500</p>
                    <p className="text-sm text-green-600">5 deliveries completed</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800">This Week</h3>
                    <p className="text-2xl font-bold">₦42,300</p>
                    <p className="text-sm text-blue-600">24 deliveries completed</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800">This Month</h3>
                    <p className="text-2xl font-bold">₦145,800</p>
                    <p className="text-sm text-purple-600">89 deliveries completed</p>
                  </div>
                </div>
                
                {/* Logout button in earnings tab as well for easy access */}
                <div className="mt-8 pt-6 border-t">
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Rider Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <p className="bg-gray-50 p-3 rounded-lg">{user?.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="bg-gray-50 p-3 rounded-lg">{user?.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <p className="bg-gray-50 p-3 rounded-lg">{user?.phone || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rider ID</label>
                    <p className="bg-gray-50 p-3 rounded-lg">{user?.riderId || "RDR-001"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                    <p className="bg-gray-50 p-3 rounded-lg">Motorcycle</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Area</label>
                    <p className="bg-gray-50 p-3 rounded-lg">Lagos Metropolitan</p>
                  </div>
                </div>
                
                <div className="space-x-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Edit Profile
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Update Documents
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;

