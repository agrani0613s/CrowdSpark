import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`/campaigns/${id}`);
        console.log("Fetched campaign:", res.data);
        setCampaign(res.data);
      } catch (err) {
        console.error("Failed to fetch campaign:", err);
      }
    };

    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading campaign details...</p>
      </div>
    );
  }

  const percentageRaised = Math.min(
    (campaign.raised / campaign.goal) * 100,
    100
  );

  const handleDonate = () => {
    // ✅ Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      alert("⚠️ Please log in to donate.");
      return;
    }

    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    // alert(`🎉 Thank you for donating ₹${donationAmount}! (payment integration coming soon)`);
    // setDonateModalOpen(false);
    // setDonationAmount("");

    // ✅ Call backend to donate (use token)
    axios.post(
      `/campaigns/${id}/donate`,
      { amount: Number(donationAmount) },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    .then(() => {
      alert(`🎉 Thank you for donating ₹${donationAmount}!`);
      setDonateModalOpen(false);
      setDonationAmount("");
    })
    .catch((err) => {
      console.error("Donation failed:", err);
      alert("❌ Donation failed. Please try again later.");
    });
    
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        ← Back to Category
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-4">
        {campaign.title}
      </h1>

      <img
        src={campaign.image || "/default-campaign.jpeg"}
        alt={campaign.title}
        className="w-full h-64 object-cover rounded-lg shadow mb-6"
      />

      <p className="text-lg text-gray-800 mb-4">{campaign.description}</p>

      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-gray-700 font-medium">
            ₹{campaign.raised?.toLocaleString() || 0} raised
          </span>
          <span className="text-gray-700 font-medium">
            Goal: ₹{campaign.goal.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentageRaised}%` }}
            transition={{ duration: 1 }}
            className="bg-green-600 h-4 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {percentageRaised.toFixed(1)}% funded
        </p>
      </div>

      <p className="text-gray-700 mb-4">
        <strong>Deadline:</strong>{" "}
        {new Date(campaign.deadline).toLocaleDateString()}
      </p>

      {/* Donate Button */}
      <button
        onClick={() => setDonateModalOpen(true)}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        💖 Donate Now
      </button>

      {/* Donation Modal */}
      {donateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Donate to {campaign.title}
            </h2>
            <input
              type="number"
              placeholder="Enter amount (₹)"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDonateModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
