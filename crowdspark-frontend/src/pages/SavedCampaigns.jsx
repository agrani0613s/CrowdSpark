import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getSavedCampaigns,
  saveCampaigns,
  unsaveCampaign,
} from "../utils/campaignStorage";

const SavedCampaigns = () => {
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [campaignToRemove, setCampaignToRemove] = useState(null);

  // Load saved campaigns on mount
  useEffect(() => {
    setSavedCampaigns(getSavedCampaigns());
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showConfirm]);

  const handleUnsaveClick = (id) => {
    setCampaignToRemove(id);
    setShowConfirm(true);
  };

  const confirmUnsave = () => {
    const updated = unsaveCampaign(campaignToRemove);
    setSavedCampaigns(updated);
    toast.success("Campaign removed!");
    setShowConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Saved Campaigns</h1>

      {savedCampaigns.length === 0 ? (
        <p className="text-gray-500">You have not saved any campaigns yet.</p>
      ) : (
        <div className="grid gap-4">
          {savedCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow-sm flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{campaign.title}</h2>
                <p className="text-gray-600">{campaign.description}</p>
              </div>
              <button
                onClick={() => handleUnsaveClick(campaign.id)}
                className="ml-4 px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
              >
                Unsave
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
       <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-50 flex items-center justify-center">

          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Remove</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to unsave this campaign?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmUnsave}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCampaigns;
