const API = import.meta.env.VITE_API;

import { toast } from "react-toastify";


export async function createPackage(data) {
    try {
        if (!data.weight || !data.dimensions || !data.description || !data.category) {
            throw new Error("All fields are required.");
        }
        const response = await fetch(`${API}/dispatches/packages/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.status === 201 || response.status === 200) {
            toast.success("Package created successfully!, ");
            return await response.json();
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.detail || "Failed to create package";
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        toast.error(error.message || "An error occurred while creating the package");
        throw error;
    }
}