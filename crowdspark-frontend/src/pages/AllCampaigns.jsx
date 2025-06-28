import React from 'react';
import CampaignList from '../components/CampaignList';

export default function AllCampaigns() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-green-700 mt-6 mb-4">
        Explore Campaigns
      </h1>
      <CampaignList />
    </div>
  );
}
