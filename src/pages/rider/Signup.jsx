import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupUser } from "../../services/auth";

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

    const credentials = { username, email, phone_number, password };

    try {
      await SignupUser(credentials);
      navigate("/rider/kyc");
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


