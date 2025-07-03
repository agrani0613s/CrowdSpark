import React, { useState, useEffect } from 'react';

export default function CampaignCard({ campaign }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('savedCampaigns')) || [];
    const alreadySaved = savedCampaigns.some(c => c.id === campaign.id);
    setIsSaved(alreadySaved);
  }, [campaign.id]);

  const handleSave = () => {
    const savedCampaigns = JSON.parse(localStorage.getItem('savedCampaigns')) || [];
    if (!isSaved) {
      savedCampaigns.push(campaign);
      localStorage.setItem('savedCampaigns', JSON.stringify(savedCampaigns));
      setIsSaved(true);
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
