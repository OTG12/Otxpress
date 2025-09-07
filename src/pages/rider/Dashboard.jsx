import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { streamLocation, getUserLocation } from "../../services/gsp";
import { riderStats, fetchRiderProfile, riderDeliveries, logout } from "../../services/rider";
import {
  Package,
  CheckCircle,
  DollarSign,
  Star,
  Truck,
  MapPin,
  FileText,
  MapPinOff,
  CreditCard,
  LogOut,
  User,
  Mail,
  Clock,
  AlertCircle,
  Navigation
} from "lucide-react";

const RiderDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    jobs: 0,
    completed_jobs: 0,
    total_earnings: 0
  });
  const [profile, setProfile] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: filter tab state
  const [filterTab, setFilterTab] = useState("all"); // all | not_started | in_progress | completed

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, profileData, deliveriesData] = await Promise.all([
          riderStats(),
          fetchRiderProfile(),
          riderDeliveries()
        ]);
        
        setStats(statsData);
        setProfile(profileData);
        setDeliveries(Array.isArray(deliveriesData) ? deliveriesData : []);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


useEffect(() => {
  let cleanupFn = null;
  let fallbackWs = null;

  const handleStreamPayload = (raw) => {
    try {
      const payload = typeof raw === "string" ? JSON.parse(raw) : raw;
      console.log("Location stream payload:", payload);

      // Normalize ids and coords from different payload shapes
      const riderId = payload.rider_id ?? payload.id ?? payload.rider?.id ?? null;
      const lat = Number(payload.latitude ?? payload.lat ?? payload.rider?.latitude);
      const lng = Number(payload.longitude ?? payload.lng ?? payload.rider?.longitude);

      if (!riderId || Number.isNaN(lat) || Number.isNaN(lng)) return;

      // Update deliveries where rider id matches
      setDeliveries((prev) =>
        prev.map((d) => {
          const rid = d.rider?.id ?? d.rider?.user_id ?? null;
          if (rid === riderId) {
            return {
              ...d,
              rider: {
                ...d.rider,
                latitude: lat,
                longitude: lng,
              },
            };
          }
          return d;
        })
      );

      // If profile belongs to the same rider, update it too
      setProfile((p) => {
        if (!p) return p;
        const pid = p.id ?? p.rider_id;
        if (pid === riderId) {
          return { ...p, latitude: lat, longitude: lng };
        }
        return p;
      });
    } catch (err) {
      console.error("Error handling stream payload:", err);
    }
  };

  (async () => {
    try {
      // streamLocation may support a callback or return a socket/unsubscribe.
      // We call it with a callback if it accepts one.
      const result = await streamLocation(handleStreamPayload);

      // If the helper returned a function => treat as unsubscribe
      if (typeof result === "function") {
        cleanupFn = result;
        console.info("streamLocation returned unsubscribe function");
        return;
      }

      // If helper returned a socket-like object (WebSocket), hook handlers
      if (result && typeof result.onmessage !== "undefined") {
        const ws = result;
        ws.onmessage = (ev) => {
          handleStreamPayload(ev.data);
        };
        ws.onopen = () => console.info("Location WebSocket connected (from streamLocation)");
        ws.onerror = (e) => console.error("Location WebSocket error (from streamLocation):", e);
        cleanupFn = () => {
          try { ws.close(); } catch (e) {}
        };
        return;
      }

      // Fallback: open a raw WebSocket to a predictable endpoint
      const baseWs = import.meta.env.VITE_WS_URL ?? "ws://localhost:8000";
      const wsUrl = `${baseWs.replace(/\/$/, "")}/ws/riders/`;
      console.info("Opening fallback WS to", wsUrl);
      fallbackWs = new WebSocket(wsUrl);
      fallbackWs.onopen = () => console.info("Fallback location WS connected");
      fallbackWs.onmessage = (ev) => handleStreamPayload(ev.data);
      fallbackWs.onerror = (e) => console.error("Fallback WS error:", e);
      cleanupFn = () => {
        try { fallbackWs.close(); } catch (e) {}
      };
    } catch (err) {
      console.error("Location streaming error:", err);
    }
  })();

  return () => {
    if (typeof cleanupFn === "function") {
      try { cleanupFn(); } catch (e) { console.warn("cleanup failed", e); }
    }
    if (fallbackWs && typeof fallbackWs.close === "function") {
      try { fallbackWs.close(); } catch (e) {}
    }
  };
}, []);



  const getStatusColor = (status) => {
    switch ((status || "").toUpperCase()) {
      case "PACKING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch ((status || "").toUpperCase()) {
      case "PACKING":
        return <Package className="w-4 h-4" />;
      case "IN_TRANSIT":
        return <Truck className="w-4 h-4" />;
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4" />;
      case "CANCELLED":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // replace existing handleLogout or wire the button to the shared logout
  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // NEW: helpers to filter deliveries by status groups
  const isNotStarted = (d) => (d.status || "").toUpperCase() === "PACKING";
  const isInProgress = (d) => (d.status || "").toUpperCase() === "IN_TRANSIT";
  const isCompleted = (d) => (d.status || "").toUpperCase() === "DELIVERED";

  const counts = {
    all: deliveries.length,
    not_started: deliveries.filter(isNotStarted).length,
    in_progress: deliveries.filter(isInProgress).length,
    completed: deliveries.filter(isCompleted).length
  };

  const filteredDeliveries = deliveries.filter((d) => {
    if (filterTab === "all") return true;
    if (filterTab === "not_started") return isNotStarted(d);
    if (filterTab === "in_progress") return isInProgress(d);
    if (filterTab === "completed") return isCompleted(d);
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Rider Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {profile && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{profile.username}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.jobs}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed_jobs}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₦{stats.total_earnings}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deliveries List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-gray-500" />
                  Recent Deliveries
                </h2>

                {/* NEW: filter tabs */}
                <div className="flex items-center gap-2">
                  {[
                    { key: "all", label: `All (${counts.all})` },
                    { key: "not_started", label: `Not started (${counts.not_started})` },
                    { key: "in_progress", label: `In progress (${counts.in_progress})` },
                    { key: "completed", label: `Completed (${counts.completed})` }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setFilterTab(tab.key)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        filterTab === tab.key ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery) => (
                    <div key={delivery.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">
                              {delivery.tracking_id}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(delivery.status)}`}>
                              {getStatusIcon(delivery.status)}
                              <span className="ml-1">{(delivery.status || "").replace('_', ' ')}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{delivery.package_description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <User className="w-4 h-4 mr-1" />
                            <span className="font-medium">From:</span>
                          </div>
                          <p className="text-gray-900">{delivery.sender_name}</p>
                          <p className="text-gray-600">{delivery.sender_phone_number}</p>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-xs">{delivery.pickup_location}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Navigation className="w-4 h-4 mr-1" />
                            <span className="font-medium">To:</span>
                          </div>
                          <p className="text-gray-900">{delivery.recipient_name}</p>
                          <p className="text-gray-600">{delivery.destination_phone_number}</p>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPinOff className="w-4 h-4 mr-1" />
                            <span className="text-xs">{delivery.destination_location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(delivery.created_at)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
                            delivery.payment_status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <CreditCard className="w-3 h-3 mr-1" />
                            {delivery.payment_status ? 'Paid' : 'Unpaid'}
                          </div>
                          {delivery.total_cost && (
                            <span className="font-semibold text-gray-900">₦{delivery.total_cost}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No deliveries found for this filter</p>
                    <p className="text-sm text-gray-400 mt-1">Try another filter or refresh</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  Profile
                </h2>
              </div>
              {profile && (
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Username</p>
                      <p className="font-medium text-gray-900">{profile.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">
                        {profile.latitude}°N, {profile.longitude}°W
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Link
                      to="/rider/profile/edit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border mt-6">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  to="/rider/deliveries"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">View All Deliveries</span>
                </Link>
                <Link
                  to="/rider/earnings"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="w-5 h-5 text-green-600">₦</span>
                  <span className="text-gray-700">Earnings Report</span>
                </Link>
                <Link
                  to="/rider/map"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Live Map</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;