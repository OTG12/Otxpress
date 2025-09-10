const API = import.meta.env.VITE_API;

import { toast } from "react-toastify";

import { apiRequest } from "./rider";

export function logoutUser(navigate) {

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  toast.success("Logout successful");

  if (navigate) {
    navigate("/login");
  }
}

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API}/users/login`, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        let data = null;
        try {
            data = await response.json();
        } catch (err) {
            // If the server did not return JSON, just ignore
        }

        if (response.ok) {
            toast.success("Login successful!");
            if (data) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            }
            return data;
        } else {
            const errorMessage = (data && data.detail) || `Login failed (status ${response.status})`;
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        toast.error(error.message || "An error occurred during login");
        throw error;
    }
}


export async function SignupUser(credentials) {
    try {
        const response = await fetch(`${API}/users/create/`, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        let data = null;
        try {
            data = await response.json();
        } catch {
            // ignore non-JSON responses
        }

        if (response.ok) {
            toast.success("Rider created successfully! Continue with your KYC.");
            if (data) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            }
            return data;
        } else {
            const errorMessage = (data && data.detail) || `Signup failed (status ${response.status})`;
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        toast.error(error.message || "An error occurred during signup");
        throw error;
    }
}





export function getUserFromToken() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  try {
  
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem("access_token") && !!localStorage.getItem("refresh_token");
}

export async function updateRider(riderId, { username, email, phone_number }) {
  return await apiRequest(
    `/users/${riderId}/`,
    "Failed to update rider",
    {
      method: "PATCH", // PATCH for partial update
      body: JSON.stringify({ username, email, phone_number }),
    }
  );
}
