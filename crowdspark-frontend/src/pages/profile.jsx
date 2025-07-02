import { useEffect, useState } from "react";
import axios from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?._id) {
      fetchUserCampaigns(storedUser._id);
    }
  }, []);

  const fetchUserCampaigns = async (userId) => {
    try {
      const res = await axios.get(`/campaigns?createdBy=${userId}`);
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>
      <p className="text-gray-600 mt-2">Email: {user?.email}</p>
      <p className="text-gray-600">Role: {user?.isAdmin ? "Admin" : "User"}</p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>

      <h3 className="mt-8 text-xl font-semibold">Your Campaigns:</h3>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 mt-2">You haven’t posted any campaigns yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="border rounded-md p-4 shadow">
              <h4 className="font-bold text-lg">{campaign.title}</h4>
              <p className="text-sm text-gray-600">{campaign.category}</p>
              <img
                src={campaign.image}
                alt="Campaign"
                className="w-full h-40 object-cover rounded mt-2"
              />
              <p className="mt-2 text-gray-700">{campaign.description}</p>
              <p className="mt-1 text-sm text-gray-500">
                Goal: ${campaign.goal}
              </p>
              <p className="text-sm text-gray-500">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
