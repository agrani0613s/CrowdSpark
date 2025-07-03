// src/utils/campaignStorage.js

const STORAGE_KEY = "savedCampaigns";

export const getSavedCampaigns = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCampaigns = (campaigns) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
};

export const unsaveCampaign = (id) => {
  const campaigns = getSavedCampaigns();
  const updated = campaigns.filter(c => c.id !== id);
  saveCampaigns(updated);
  return updated;
};

export const saveNewCampaign = (campaign) => {
  const campaigns = getSavedCampaigns();
  const exists = campaigns.some(c => c.id === campaign.id);
  if (exists) return { success: false, message: "Already saved!" };

  const updated = [...campaigns, campaign];
  saveCampaigns(updated);
  return { success: true };
};
