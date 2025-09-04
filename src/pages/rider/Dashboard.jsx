import { Link } from "react-router-dom";

const RiderDashboard = ({ user }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Your Ride History</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>Lagos Island → Ikeja (01 Sept 2025)</li>
          <li>Lekki → Victoria Island (28 Aug 2025)</li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          to="/rider"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default RiderDashboard;
