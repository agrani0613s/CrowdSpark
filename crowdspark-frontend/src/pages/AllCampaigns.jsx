// src/pages/AllCampaigns.jsx
import React from "react";
import { toast } from "react-hot-toast";
import { saveNewCampaign } from "../utils/campaignStorage";

// Sample campaigns (replace this with fetched campaigns when backend is ready)
const campaigns = [
  {
    id: 101,
    title: "Tree Plantation Drive",
    description: "Let’s plant 1000 trees across the city.",
  },
  {
    id: 102,
    title: "Clean Water Mission",
    description: "Bringing clean water to remote villages.",
  },
];

const AllCampaigns = () => {
  const handleSave = (campaign) => {
    const result = saveNewCampaign(campaign);
    if (result.success) {
      toast.success("Campaign saved!");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">All Campaigns</h1>

      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg p-5 shadow border border-gray-200 flex justify-between items-start"
          >
            <div>
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p className="text-gray-600">{campaign.description}</p>
            </div>
            <button
              onClick={() => handleSave(campaign)}
              className="ml-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
