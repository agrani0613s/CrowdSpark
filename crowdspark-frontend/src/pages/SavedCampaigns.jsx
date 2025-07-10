import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Use same mock data as AllCampaigns
const mockCampaigns = {
  "save-oceans": {
    title: "Save the Oceans",
    description: "Help clean plastic waste from the sea 🌊",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  "educate-girls": {
    title: "Educate Every Girl",
    description: "Support education initiatives for girls in rural India 🎓",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
  },
};

const SavedCampaigns = () => {
  const [saved, setSaved] = useState([]);

  // Load saved campaign IDs from localStorage
  useEffect(() => {
    const savedFromStorage = JSON.parse(localStorage.getItem("savedCampaigns")) || [];
    setSaved(savedFromStorage);
  }, []);

  // Update localStorage whenever saved list changes
  useEffect(() => {
    localStorage.setItem("savedCampaigns", JSON.stringify(saved));
  }, [saved]);

  const handleUnsave = (id) => {
    const updated = saved.filter((item) => item !== id);
    setSaved(updated);
    toast("❌ Campaign unsaved");
  };

  const savedCampaigns = saved
    .filter((id) => mockCampaigns[id])
    .map((id) => ({ id, ...mockCampaigns[id] }));

  if (savedCampaigns.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        You haven not saved any campaigns yet.
      </div>
    );
  }
const backendBaseURL = import.meta.env.VITE_API_URL;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Saved Campaigns
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savedCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <img
              src={`${backendBaseURL}${campaign.image}`}
              alt={campaign.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
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
                onClick={() => handleUnsave(campaign.id)}
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
