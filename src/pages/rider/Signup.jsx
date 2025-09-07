import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RiderSignup = ({ onSignup }) => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/users/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phone_number, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data);
        throw new Error(
          data.detail || JSON.stringify(data) || "Signup failed"
        );
      }

      // ✅ Save token if your backend returns one
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // ✅ Call onSignup with user data to update App state
      if (onSignup) {
        onSignup(data.user || data); // Adjust based on your API response structure
      }

      // ✅ Redirect directly to dashboard
      navigate("/rider/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4">Rider Signup</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <input
          type="text"
          id="username"
          name="username"
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-3"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded mb-3"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="tel"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link to="/rider" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RiderSignup;


