import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Updated mock data with category, createdAt, and fundsRaised
const mockCampaigns = {
  "save-oceans": {
    title: "Save the Oceans",
    description: "Help clean plastic waste from the sea 🌊",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    category: "Environment",
    createdAt: "2024-06-10",
    fundsRaised: 12000,
  },
  "educate-girls": {
    title: "Educate Every Girl",
    description: "Support education initiatives for girls 🎓",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    category: "Education",
    createdAt: "2024-06-28",
    fundsRaised: 19000,
  },
};

const AllCampaigns = () => {
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    const savedFromStorage = JSON.parse(localStorage.getItem("savedCampaigns")) || [];
    setSaved(savedFromStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCampaigns", JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (id) => {
    if (saved.includes(id)) {
      setSaved(saved.filter((item) => item !== id));
      toast("❌ Campaign unsaved");
    } else {
      setSaved([...saved, id]);
      toast.success("✅ Campaign saved!");
    }
  };

  // Filter + Sort + Search logic
  const filteredCampaigns = Object.entries(mockCampaigns)
    .filter(([id, campaign]) => {
      const matchesSearch = campaign.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || campaign.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const cA = a[1];
      const cB = b[1];
      if (sortBy === "Newest") {
        return new Date(cB.createdAt) - new Date(cA.createdAt);
      } else if (sortBy === "Trending") {
        return (cB.fundsRaised || 0) - (cA.fundsRaised || 0);
      } else {
        return cA.title.localeCompare(cB.title); // fallback
      }
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        All Campaigns
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Environment">Environment</option>
          <option value="Education">Education</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="Newest">Newest</option>
          <option value="Trending">Trending</option>
        </select>
      </div>

      {/* Campaign Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCampaigns.map(([id, campaign]) => (
          <div key={id} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col">
            <Link to={`/campaign/${id}`}>
              <img
                src={campaign.image}
                alt={campaign.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
                }}
                className="w-full h-40 object-cover"
              />
            </Link>

            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold text-green-700">
                {campaign.title}
              </h2>
              <p className="text-gray-600 text-sm">{campaign.description}</p>
              <p className="text-xs text-gray-500 mt-1">📁 {campaign.category}</p>
            </div>

            <div className="p-4 border-t text-right">
              <button
                onClick={() => toggleSave(id)}
                className="text-sm font-medium text-green-600 hover:underline"
              >
                {saved.includes(id) ? "Unsave Campaign" : "Save Campaign"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
