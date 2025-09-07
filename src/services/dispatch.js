const API = import.meta.env.VITE_API;

import { toast } from "react-toastify";


export async function createDispatch(data) {
    try {
        const response = await fetch(`${API}/dispatches/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.status === 201 || response.status === 200) {
            toast.success("Dispatch created successfully!, ");
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