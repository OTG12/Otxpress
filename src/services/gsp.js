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
        },
        {
          enableHighAccuracy: true,  
          timeout: 10000,            // ✅ wait max 10s before failing
          maximumAge: 0,             // ✅ no cached position
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export async function streamLocation() {
  try {
    const user = await getUserFromToken();  // already parsed
    const riderId = user?.user_id;

    if (!riderId) {
      console.error("❌ No riderId found, redirecting to login...");
      window.location.href = "/login";
      return;
    }

    const socket = new WebSocket(`ws://localhost:8000/ws/riders/${riderId}/`);

    socket.onopen = () => {
      console.log(`✅ Connected to WS for rider ${riderId}`);

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
          console.error("Failed to get location:", err);
        }
      }, 5000);
    };

    socket.onmessage = (event) => {
      console.log("📍 Location update:", JSON.parse(event.data));
    };

    socket.onclose = () => {
      console.warn("⚠️ WebSocket closed");
    };
  } catch (err) {
    console.error("❌ Error starting location stream:", err);
  }
}