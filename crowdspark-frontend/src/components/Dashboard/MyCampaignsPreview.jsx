import React from 'react';
import CampaignCard from '../CampaignCard';

const MyCampaignsPreview = ({ campaigns }) => {
  const myCampaigns = campaigns.slice(0, 3);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-teal-800 mb-3">My Campaigns</h2>
      <div className="flex flex-wrap gap-4">
        {myCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default MyCampaignsPreview;
