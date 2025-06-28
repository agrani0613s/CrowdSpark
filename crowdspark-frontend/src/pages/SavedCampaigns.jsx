// src/pages/SavedCampaigns.jsx
import { useEffect, useState } from 'react';
import CampaignCard from '../components/CampaignCard';

export default function SavedCampaigns() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedCampaigns');
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Campaigns</h1>
      {saved.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saved.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <p>No saved campaigns yet.</p>
      )}
    </div>
  );
}
