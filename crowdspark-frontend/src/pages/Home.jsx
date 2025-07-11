import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import Features from "../components/Features";
import Footer from "../components/Footer";
import CampaignCarousel from "../components/CampaignCarousel";
import ContactSection from "../components/ContactSection";
import AuthModal from "../components/AuthModal";
import ExplorePanel from "../components/ExplorePanel";
import axios from "../api/axios";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [highestFunded, setHighestFunded] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);

  useEffect(() => {
    const toggle = () => setShowExplore((prev) => !prev);
    window.addEventListener("toggleExplore", toggle);
    return () => window.removeEventListener("toggleExplore", toggle);
  }, []);

useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        axios.get("/campaigns"),                       // default: latest
        axios.get("/campaigns?sortBy=raised"),         // for highest funded
        axios.get("/campaigns?sortBy=views"),          // for most viewed ✅
      ]);

      setTopCampaigns(res1.data.slice(0, 5));
      setHighestFunded(res2.data.slice(0, 5));
      setMostViewed(res3.data.slice(0, 5)); // 👈 Add this line

    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    }
  };

  fetchCampaigns();
}, []);


  


return (
  <div className="min-h-screen flex flex-col bg-yellow-50">
    {/* 🌐 Navbar */}
    <Navbar onLoginClick={() => setShowAuth(true)} />

    {/* 🎯 Hero Section */}
    <div className="px-4 sm:px-8 lg:px-16 pt-8">
      <Hero onLoginClick={() => setShowAuth(true)} />
    </div>

    {/* 🔥 Top Fundraisers */}
    <section className="py-12 px-4 sm:px-8 lg:px-16 bg-white">
      <CampaignCarousel
        title="🔥 Top Fundraisers"
        campaigns={topCampaigns}
      />
    </section>

    {/* 💰 Highest Funded */}
    <section className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-50">
      <CampaignCarousel
        title="💰 Highest Funded Campaigns"
        campaigns={highestFunded}
      />
    </section>

    {/* 👀 Most Viewed */}
    <section className="py-12 px-4 sm:px-8 lg:px-16 bg-white">
      <CampaignCarousel
        title="👀 Most Viewed Campaigns"
        campaigns={mostViewed}
      />
    </section>

    {/* 📞 Contact Us */}
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-yellow-50 to-white">
      <ContactSection />
    </section>

    {/* 🔻 Footer */}
    <Footer />

    {/* Modals */}
    <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    <ExplorePanel isOpen={showExplore} onClose={() => setShowExplore(false)} />
  </div>
);

}
