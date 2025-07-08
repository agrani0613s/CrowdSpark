import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Mock campaign data
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

const AllCampaigns = () => {
  const [saved, setSaved] = useState([]);

  // Load saved campaigns from localStorage
  useEffect(() => {
    const savedFromStorage = JSON.parse(localStorage.getItem("savedCampaigns")) || [];
    setSaved(savedFromStorage);
  }, []);

  // Save updated list to localStorage
  useEffect(() => {
    localStorage.setItem("savedCampaigns", JSON.stringify(saved));
  }, [saved]);

  // Toggle save/unsave with toast notifications
  const toggleSave = (id) => {
    if (saved.includes(id)) {
      setSaved(saved.filter((item) => item !== id));
      toast("❌ Campaign unsaved");
    } else {
      setSaved([...saved, id]);
      toast.success("✅ Campaign saved!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        All Campaigns
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(mockCampaigns).map(([id, campaign]) => (
          <div key={id} className="relative">
            {/* Entire card is clickable */}
            <Link
              to={`/campaign/${id}`}
              className="block hover:no-underline"
            >
              <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col">
                <img
                  src={campaign.image}
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
                  <p className="text-gray-600 mt-1 text-sm">
                    {campaign.description}
                  </p>
                </div>
              </div>
            </Link>

            {/* Save/Unsave button outside the card */}
            <div className="p-2 text-right">
              <button
                onClick={() => toggleSave(id)}
                className="text-sm font-medium text-green-600 hover:underline"
              >
                {saved.includes(id) ? "Unsave Campaign" : "Save Campaign"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
