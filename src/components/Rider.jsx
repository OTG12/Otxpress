
function Profile({ user }) {
  return (
    <div id="rider" className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
      </div>
      <h4 className="text-lg font-bold mb-2">Ride History</h4>
      <ul className="space-y-2">
        {user.rides.map((ride) => (
          <li
            key={ride.id}
            className="p-3 bg-gray-100 rounded-lg flex justify-between"
          >
            <div>
              <p className="font-semibold">{ride.from} → {ride.to}</p>
              <p className="text-sm text-gray-500">{ride.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
