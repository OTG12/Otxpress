const API = import.meta.env.VITE_API;

import  {toast } from 'react-hot-toast';

export async function submitKYC(formData) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(`${API}/kycs/`, {    
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                // If you're uploading files, use FormData instead of JSON
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        let data = null;
        try {
            data = await response.json();
        } catch (err) {
            // Ignore if response is not JSON
        }

        if (response.ok) {
            toast.success("Your KYC has been submitted successfully!");
            return data;
        } else {
            const errorMessage = (data && data.detail) || `KYC submission failed (status ${response.status})`;
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        toast.error(error.message || "An error occurred during KYC submission");
        throw error;
    }
}
