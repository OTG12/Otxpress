// RiderDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { streamLocation, getUserLocation } from "../../services/gsp";
import { updateRider } from "../../services/auth";
import {
  riderStats,
  fetchRiderProfile,
  riderDeliveries,
  logout as riderLogout,
} from "../../services/rider";
import { toast } from "react-toastify";
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
  Navigation,
  Clipboard,
  X,
  Edit3,
  Phone,
  Smartphone,
} from "lucide-react";

/**
 * RiderDashboard
 *
 * Full dashboard for riders including:
 * - Stats cards
 * - Filterable deliveries list
 * - Profile card
 * - Edit profile modal (updates username, email, phone_number)
 * - Live location stream handling (streamLocation fallback)
 * - Logout
 *
 * Notes:
 * - updateRider(profileId, data) is expected to be available.
 * - All network/service functions are expected to throw errors for failure cases.
 * - Adjust styling/classes to match your tailwind setup if necessary.
 */

const RiderDashboard = () => {
  const navigate = useNavigate();

  // --- Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data states
  const [stats, setStats] = useState({
    jobs: 0,
    completed_jobs: 0,
    total_earnings: 0,
  });
  const [profile, setProfile] = useState(null);
  const [deliveries, setDeliveries] = useState([]);

  // --- Filter tab
  const [filterTab, setFilterTab] = useState("all"); // all | not_started | in_progress | completed

  // --- Edit modal states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [saving, setSaving] = useState(false);

  // --- Misc
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastStreamPayload, setLastStreamPayload] = useState(null);

  // --- Fetch initial dashboard data
  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [statsRes, profileRes, deliveriesRes] = await Promise.all([
          riderStats(),
          fetchRiderProfile(),
          riderDeliveries(),
        ]);

        if (!mounted) return;

        setStats(statsRes || { jobs: 0, completed_jobs: 0, total_earnings: 0 });
        setProfile(profileRes || null);
        setDeliveries(Array.isArray(deliveriesRes) ? deliveriesRes : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        if (!mounted) return;
        setError("Failed to load dashboard data. Please refresh.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  // --- Live location streaming & fallback WebSocket
  useEffect(() => {
    let cleanupFn = null;
    let fallbackWs = null;

    const handleStreamPayload = (raw) => {
      try {
        const payload = typeof raw === "string" ? JSON.parse(raw) : raw;
        setLastStreamPayload(payload);

        // Normalize common shapes
        const riderId = payload.rider_id ?? payload.id ?? payload.rider?.id ?? null;
        const lat = Number(payload.latitude ?? payload.lat ?? payload.rider?.latitude);
        const lng = Number(payload.longitude ?? payload.lng ?? payload.rider?.longitude);

        if (!riderId || Number.isNaN(lat) || Number.isNaN(lng)) {
          return;
        }

        // update deliveries where rider matches
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

        // update profile if it belongs to same rider
        setProfile((p) => {
          if (!p) return p;
          const pid = p.id ?? p.rider_id;
          if (pid === riderId) {
            return { ...p, latitude: lat, longitude: lng };
          }
          return p;
        });
      } catch (err) {
        console.error("handleStreamPayload error:", err);
      }
    };

    (async () => {
      try {
        const result = await streamLocation(handleStreamPayload);

        // streamLocation returned an unsubscribe function
        if (typeof result === "function") {
          setIsStreaming(true);
          cleanupFn = result;
          console.info("streamLocation provided unsubscribe function.");
          return;
        }

        // streamLocation returned a socket-like object
        if (result && typeof result.onmessage !== "undefined") {
          const ws = result;
          setIsStreaming(true);
          ws.onopen = () => console.info("Provided WebSocket opened by streamLocation");
          ws.onmessage = (ev) => handleStreamPayload(ev.data);
          ws.onerror = (e) => console.error("streamLocation websocket error:", e);
          cleanupFn = () => {
            try { ws.close(); } catch (e) {}
          };
          return;
        }

        // fallback: open a predictable websocket path
        const baseWs = import.meta.env.VITE_WS_URL ?? "ws://localhost:8000";
        const wsUrl = `${baseWs.replace(/\/$/, "")}/ws/riders/`;
        console.info("Opening fallback WS:", wsUrl);
        fallbackWs = new WebSocket(wsUrl);
        fallbackWs.onopen = () => {
          setIsStreaming(true);
          console.info("Fallback WS connected");
        };
        fallbackWs.onmessage = (ev) => handleStreamPayload(ev.data);
        fallbackWs.onerror = (e) => console.error("Fallback WS error:", e);
        cleanupFn = () => {
          try { fallbackWs.close(); } catch (e) {}
        };
      } catch (err) {
        console.error("Error initializing location stream:", err);
        setIsStreaming(false);
      }
    })();

    return () => {
      if (typeof cleanupFn === "function") {
        try { cleanupFn(); } catch (e) { console.warn("cleanupFn failed", e); }
      }
      if (fallbackWs && typeof fallbackWs.close === "function") {
        try { fallbackWs.close(); } catch (e) {}
      }
    };
  }, []);

  // --- Helpers for status UI
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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // --- Filter helpers
  const isNotStarted = (d) => (d.status || "").toUpperCase() === "PACKING";
  const isInProgress = (d) => (d.status || "").toUpperCase() === "IN_TRANSIT";
  const isCompleted = (d) => (d.status || "").toUpperCase() === "DELIVERED";

  const counts = {
    all: deliveries.length,
    not_started: deliveries.filter(isNotStarted).length,
    in_progress: deliveries.filter(isInProgress).length,
    completed: deliveries.filter(isCompleted).length,
  };

  const filteredDeliveries = deliveries.filter((d) => {
    if (filterTab === "all") return true;
    if (filterTab === "not_started") return isNotStarted(d);
    if (filterTab === "in_progress") return isInProgress(d);
    if (filterTab === "completed") return isCompleted(d);
    return true;
  });

  // --- Logout handler
  const handleLogout = async () => {
    try {
      await riderLogout();
      // redirect to login page after logout
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to logout. Please try again.");
    }
  };

  // --- Open edit modal (populate form)
  const openEditModal = () => {
    setEditForm({
      username: profile?.username ?? "",
      email: profile?.email ?? "",
      phone_number: profile?.phone_number ?? "",
    });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // --- Save profile (only username, email, phone_number)
  const handleSaveProfile = async () => {
    if (!profile || !profile.id) {
      toast.error("Unable to determine your profile id.");
      return;
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editForm.email && !emailRegex.test(editForm.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!editForm.username || !editForm.username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      // IMPORTANT: we call updateRider(profileId, data)
      const updated = await updateRider(profile.id, {
        username: editForm.username.trim(),
        email: editForm.email.trim(),
        phone_number: editForm.phone_number.trim(),
      });

      // Merge updated fields into UI state
      setProfile((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      const msg = err?.message ?? "Failed to update profile.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // --- Copy tracking id helper (for a given delivery)
  const copyTrackingId = async (trackingId) => {
    try {
      await navigator.clipboard.writeText(trackingId);
      toast.success("Tracking ID copied to clipboard.");
    } catch (err) {
      console.error("copy error:", err);
      toast.error("Failed to copy tracking ID.");
    }
  };

  // --- Quick attempt to open rider's live location on map (if present)
  const openMapForDelivery = (delivery) => {
    const lat = delivery?.rider?.latitude;
    const lng = delivery?.rider?.longitude;
    if (!lat || !lng) {
      toast.info("No live location for this delivery yet.");
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${lat},${lng}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // --- UI: small subcomponents inside this file for readability

  const StatsCard = ({ title, value, Icon }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );

  const DeliveryItem = ({ delivery }) => {
    return (
      <div className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-gray-900">{delivery.tracking_id}</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                  delivery.status
                )}`}
              >
                {getStatusIcon(delivery.status)}
                <span className="ml-1">{(delivery.status || "").replace("_", " ")}</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{delivery.package_description}</p>

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
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {formatDate(delivery.created_at)}
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center px-2 py-1 rounded-full text-xs ${
                delivery.payment_status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              <CreditCard className="w-3 h-3 mr-1" />
              {delivery.payment_status ? "Paid" : "Unpaid"}
            </div>

            {delivery.total_cost && (
              <span className="font-semibold text-gray-900">₦{delivery.total_cost}</span>
            )}

            <button
              onClick={() => copyTrackingId(delivery.tracking_id)}
              className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              title="Copy tracking id"
            >
              <Clipboard className="w-4 h-4" />
            </button>

            <button
              onClick={() => openMapForDelivery(delivery)}
              className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              title="Open live location"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Page render conditions
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
          <StatsCard title="Total Jobs" value={stats.jobs ?? 0} Icon={Package} />
          <StatsCard title="Completed Jobs" value={stats.completed_jobs ?? 0} Icon={CheckCircle} />
          <StatsCard title="Total Earnings" value={`₦${stats.total_earnings ?? 0}`} Icon={DollarSign} />
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

                {/* Filter tabs */}
                <div className="flex items-center gap-2">
                  {[
                    { key: "all", label: `All (${counts.all})` },
                    { key: "not_started", label: `Not started (${counts.not_started})` },
                    { key: "in_progress", label: `In progress (${counts.in_progress})` },
                    { key: "completed", label: `Completed (${counts.completed})` },
                  ].map((tab) => (
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
                    <DeliveryItem key={delivery.id} delivery={delivery} />
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

              {profile ? (
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
                        {profile.latitude ?? "—"}°N, {profile.longitude ?? "—"}°W
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <button
                      onClick={openEditModal}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                    >
                      <Edit3 className="inline mr-2 w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No profile data available</p>
                  <Link to="/rider/profile/edit" className="mt-3 inline-block text-blue-600">
                    Go to profile editor
                  </Link>
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

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded hover:bg-gray-100"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <input
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone number</label>
                <input
                  name="phone_number"
                  value={editForm.phone_number}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="+2348012345678"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
