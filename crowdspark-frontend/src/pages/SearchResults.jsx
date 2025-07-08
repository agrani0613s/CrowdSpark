import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import CampaignCarousel from "../components/CampaignCarousel";

export default function SearchResults() {
  const [exactMatches, setExactMatches] = useState([]);
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);
  const location = useLocation();

  // Extract ?q=searchTerm from URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // const res = await axios.get(`/campaigns/search?q=${encodeURIComponent(query)}`);
        const res = await axios.get("/campaigns/search", {
  params: { q: searchTerm },
});

        const data = res.data;

        setExactMatches(data.exact || []);
        setRelatedCampaigns(data.related || []);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="px-6">
      <h1 className="text-3xl font-bold mt-6 mb-4">Search Results for {query}</h1>

      {exactMatches.length > 0 ? (
        <CampaignCarousel title="🎯 Exact Match" campaigns={exactMatches} />
      ) : (
        <p>No exact match found.</p>
      )}

      {relatedCampaigns.length > 0 ? (
        <CampaignCarousel title="🔥 Related Campaigns" campaigns={relatedCampaigns} />
      ) : (
        <p>No related campaigns found.</p>
      )}
    </div>
  );
}
