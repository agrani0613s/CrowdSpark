// src/pages/CampaignDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

const mockCampaigns = {
  "save-oceans": {
    title: "Save the Oceans",
    description: "Help clean plastic waste from the sea 🌊",
    goal: 100000,
    raised: 45000,
    organizer: "Neha Sharma",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  "educate-girls": {
    title: "Educate Every Girl",
    description: "Support education initiatives for girls in rural India 🎓",
    goal: 50000,
    raised: 38000,
    organizer: "Aarav Patel",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
  },
};


const CampaignDetail = () => {
  const { id } = useParams(); // e.g., save-oceans
  const campaign = mockCampaigns[id];

  if (!campaign) {
    return <div className="p-10 text-center text-red-500">Campaign not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-64 object-cover rounded-xl mb-6 shadow"
      />
      <h1 className="text-3xl font-bold text-green-700 mb-2">{campaign.title}</h1>
      <p className="text-gray-600 mb-4">{campaign.description}</p>

      <div className="mb-4">
        <span className="font-medium text-gray-800">Organizer:</span> {campaign.organizer}
      </div>

      <div className="mb-4">
        <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          ₹{campaign.raised.toLocaleString()} raised of ₹{campaign.goal.toLocaleString()} goal
        </p>
      </div>

      <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
        Donate Now
      </button>
    </div>
  );
};

export default CampaignDetail;
