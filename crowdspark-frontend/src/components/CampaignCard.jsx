import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CampaignCard({ campaign }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('savedCampaigns')) || [];
    const alreadySaved = savedCampaigns.some(c => c.id === campaign.id);
    setIsSaved(alreadySaved);
  }, [campaign.id]);

const handleSave = async () => {
  try {
    await axios.post(`/api/users/save-campaign/${campaign.id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setIsSaved(true);
  } catch (err) {
    console.error("Error saving campaign", err);
  }
};

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <h2 className="text-lg font-bold text-green-700">{campaign.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
      <button
        onClick={handleSave}
        disabled={isSaved}
        className={`px-4 py-1 rounded ${
          isSaved
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isSaved ? 'Saved' : 'Save Campaign'}
      </button>
    </div>
  );
}

// ✅ PropTypes validation
CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string, // optional if you don’t use it here
    goal: PropTypes.number,  // optional if not used here
    raised: PropTypes.number // optional if not used here
  }).isRequired,
};
