const API = import.meta.env.VITE_API;
import { toast } from "react-toastify";

// Smart API Request Helper
export async function apiRequest(endpoint, errorMessage, options = {}) {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken) {
    window.location.href = "/login"; // no token, force login
    throw new Error("No access token found");
  }

  // Default request options
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    ...options,
  };

  try {
    let response = await fetch(`${API}${endpoint}`, fetchOptions);

    // If token expired → try refreshing
    if (response.status === 401 && refreshToken) {
      try {
        const refreshResponse = await fetch(`${API}/api/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!refreshResponse.ok) {
          // Refresh also failed → logout
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          throw new Error("Session expired. Please log in again.");
        }

        const data = await refreshResponse.json();
        accessToken = data.access; // new access token
        localStorage.setItem("access_token", data.access);
        if (data.refresh) {
          localStorage.setItem("refresh_token", data.refresh);
        }

        // Retry the original request with new token
        fetchOptions.headers["Authorization"] = `Bearer ${accessToken}`;
        response = await fetch(`${API}${endpoint}`, fetchOptions);
      } catch (refreshError) {
        toast.error("Failed to refresh session. Please log in again.");
        window.location.href = "/login";
        throw refreshError;
      }
    }

    // Handle final response
    if (response.ok) {
      return await response.json();
    } else {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(errorMessage);
      }
      const message = errorData.detail || errorMessage;
      toast.error(message);
      throw new Error(message);
    }
  } catch (error) {
    toast.error(error.message || errorMessage);
    throw error;
  }
}

// Rider profile
export async function fetchRiderProfile() {
  return apiRequest("/dispatches/riders/profile", "Failed to fetch rider profile");
}

// Rider stats
export async function riderStats() {
  return apiRequest("/dispatches/riders/stats", "Failed to fetch rider stats");
}

// Rider deliveries
export async function riderDeliveries() {
  return apiRequest("/dispatches/riders/orders", "Failed to fetch rider deliveries");
}

// add a simple logout helper that UI can call
export function logout() {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // optionally remove any user data
    localStorage.removeItem("rider");
  } finally {
    // redirect to login
    window.location.href = "/login";
  }
}
