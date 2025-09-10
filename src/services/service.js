const API = import.meta.env.VITE_API;

export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file); 

    const response = await fetch(`${API}/files`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data.id
  } catch (error) {
    console.error("File upload error:", error);
    return { error: error.message };
  }
}
