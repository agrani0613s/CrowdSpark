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
  const [isSaved, setIsSaved] = useState(false);

  const backendBaseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const controller = new AbortController();
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`/campaigns/${id}`, { signal: controller.signal });
        setCampaign(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Failed to fetch campaign:", err);
        }
      }
    };
    fetchCampaign();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await axios.post(`${backendBaseURL}/api/campaigns/${id}/increment-view`);
      } catch (err) {
        console.error("Failed to increment view count", err);
      }
    };
    incrementViews();
  }, [id]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) return;
    const checkIfSaved = async () => {
      try {
        const res = await axios.get(`${backendBaseURL}/api/users/saved-campaigns`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const savedIds = res.data.map((c) => c._id);
        setIsSaved(savedIds.includes(id));
      } catch (err) {
        console.error("Failed to check saved status:", err);
      }
    };
    checkIfSaved();
  }, [id]);

  const percentageRaised = Math.min((campaign?.raised / campaign?.goal) * 100, 100);

  const handleDonate = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      alert("⚠️ Please log in to donate.");
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    axios
      .post(`/campaigns/${id}/donate`, { amount: Number(donationAmount) }, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
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

  const handleToggleSave = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      alert("Please log in to save this campaign");
      return;
    }
    try {
      if (isSaved) {
        await axios.delete(`${backendBaseURL}/api/users/save-campaign/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${backendBaseURL}/api/users/save-campaign/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsSaved(!isSaved);
    } catch (err) {
      console.error("Toggle save failed", err);
    }
  };

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading campaign details...</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          ← Back to Category
        </button>

        <h1 className="text-4xl font-bold text-green-700 mb-2">{campaign.title}</h1>
        <p className="text-sm text-gray-500 mb-4">👁️ {campaign.views || 0} views</p>

        <img
          src={`${backendBaseURL}${campaign.image}` || "/default-campaign.jpeg"}
          alt={campaign.title}
          className="w-full h-64 object-cover rounded-lg shadow mb-6"
        />

        <p className="text-lg text-gray-800 mb-6 leading-relaxed">{campaign.description}</p>

        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
            <span>₹{campaign.raised?.toLocaleString() || 0} raised</span>
            <span>Goal: ₹{campaign.goal.toLocaleString()}</span>
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

        <p className="text-gray-700 mb-6">
          <strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setDonateModalOpen(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            💖 Donate Now
          </button>

          <button
            onClick={handleToggleSave}
            className={`px-6 py-3 rounded-lg shadow transition ${
              isSaved ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-800"
            }`}
          >
            {isSaved ? "💔 Unsave" : "❤️ Save Campaign"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {donateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Donate to {campaign.title}</h2>
            <input
              type="number"
              placeholder="Enter amount (₹)"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-green-200"
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
