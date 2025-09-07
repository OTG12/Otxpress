const WS = import.meta.env.WS;
import { getUserFromToken } from "./auth";

export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export async function streamLocation() {
  try {
    const { user_id: riderId } = await getUserFromToken(); // ✅ no .json()
    if (!riderId) throw new Error("No rider ID found in token");

    const socket = new WebSocket(`${WS}/ws/riders/${riderId}/`);

    socket.onopen = () => {
      console.log("✅ WebSocket connected");

      // send location every 5 seconds
      setInterval(async () => {
        try {
          const { latitude, longitude } = await getUserLocation();
          socket.send(
            JSON.stringify({
              rider_id: riderId,
              latitude,
              longitude,
            })
          );
        } catch (err) {
          console.error("❌ Failed to get location:", err);
        }
      }, 5000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📍 Location update:", data);
    };

    socket.onclose = () => {
      console.warn("⚠️ WebSocket closed");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  } catch (err) {
    console.error("❌ Cannot stream location:", err);
  }
}
