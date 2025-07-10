import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SavedCampaigns = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendBaseURL = import.meta.env.VITE_API_URL;

  // 🔁 Fetch saved campaigns from backend
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${backendBaseURL}/api/users/saved-campaigns`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSaved(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch saved campaigns", error);
        toast.error("Failed to load saved campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [backendBaseURL]);

  // ❌ Handle unsave
  const handleUnsave = async (id) => {
    try {
      await axios.delete(`${backendBaseURL}/api/users/save-campaign/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSaved((prev) => prev.filter((campaign) => campaign._id !== id));
      toast("❌ Campaign unsaved");
    } catch (err) {
      console.error("Error unsaving campaign", err);
      toast.error("Could not unsave campaign");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">Loading...</div>
    );
  }

  if (saved.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        You haven’t saved any campaigns yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Saved Campaigns
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {saved.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <img
              src={
                campaign.image?.startsWith("http")
                  ? campaign.image
                  : `${backendBaseURL}/${campaign.image}`
              }
              alt={campaign.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/800x400?text=No+Image";
              }}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold text-green-700">
                {campaign.title}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">{campaign.description}</p>
            </div>

            <div className="p-4 border-t text-right">
              <button
                onClick={() => handleUnsave(campaign._id)}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Unsave Campaign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCampaigns;
