import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// Mock campaign data (same as AllCampaigns.jsx)
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

  useEffect(() => {
    const savedFromStorage = JSON.parse(localStorage.getItem("savedCampaigns")) || [];
    setSaved(savedFromStorage);
  }, []);

  const handleUnsave = (id) => {
    const updated = saved.filter((item) => item !== id);
    setSaved(updated);
    localStorage.setItem("savedCampaigns", JSON.stringify(updated));
    toast("❌ Campaign removed from saved");
  };

  const savedCampaignData = saved
    .map((id) => ({ id, ...mockCampaigns[id] }))
    .filter((camp) => camp.title); // in case of invalid/missing ID

  if (savedCampaignData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl text-gray-600">No saved campaigns yet 😕</h2>
        <Link
          to="/campaigns"
          className="text-green-600 underline mt-4 inline-block"
        >
          Browse campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Saved Campaigns
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savedCampaignData.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <Link to={`/campaign/${campaign.id}`}>
              <img
                src={campaign.image}
                alt={campaign.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
                }}
                className="w-full h-40 object-cover"
              />
            </Link>

            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold text-green-700">
                {campaign.title}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">{campaign.description}</p>
            </div>

            <div className="p-4 border-t text-right">
              <button
                onClick={() => handleUnsave(campaign.id)}
                className="text-sm font-medium text-red-600 hover:underline"
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
