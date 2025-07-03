import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CampaignCarousel from "../components/CampaignCarousel";
import ContactSection from "../components/ContactSection";
import AuthModal from "../components/AuthModal";
import ExplorePanel from "../components/ExplorePanel";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [showExplore, setShowExplore] = useState(false);

  const topCampaigns = [
    {
      title: "Save the Earth",
      image: "https://via.placeholder.com/300x200",
      description: "Join us to fight climate change.",
      goal: 100000,
      raised: 60000,
    },
    {
      title: "Tech for Kids",
      image: "https://via.placeholder.com/300x200",
      description: "Empowering kids through technology.",
      goal: 50000,
      raised: 30000,
    },
    {
      title: "Clean Oceans",
      image: "https://via.placeholder.com/300x200",
      description: "Remove plastic from the sea.",
      goal: 80000,
      raised: 80000,
    },
    {
      title: "Green Homes",
      image: "https://via.placeholder.com/300x200",
      description: "Eco-friendly housing initiative.",
      goal: 120000,
      raised: 95000,
    },
    {
      title: "Wildlife Rescue",
      image: "https://via.placeholder.com/300x200",
      description: "Saving endangered animals.",
      goal: 75000,
      raised: 45000,
    },
  ];

  const highestFunded = [
    {
      title: "Water for All",
      image: "https://via.placeholder.com/300x200",
      description: "Clean water for remote areas.",
      goal: 100000,
      raised: 100000,
    },
    {
      title: "Solar Village",
      image: "https://via.placeholder.com/300x200",
      description: "Provide solar power to rural homes.",
      goal: 150000,
      raised: 140000,
    },
    {
      title: "Rural Education",
      image: "https://via.placeholder.com/300x200",
      description: "Build schools in underserved areas.",
      goal: 90000,
      raised: 60000,
    },
    {
      title: "Tree Plantation Drive",
      image: "https://via.placeholder.com/300x200",
      description: "Plant 10,000 trees across India.",
      goal: 50000,
      raised: 50000,
    },
    {
      title: "Community Health Camps",
      image: "https://via.placeholder.com/300x200",
      description: "Free health checkups for all.",
      goal: 70000,
      raised: 40000,
    },
  ];

  useEffect(() => {
    const toggle = () => setShowExplore((prev) => !prev);
    window.addEventListener("toggleExplore", toggle);
    return () => window.removeEventListener("toggleExplore", toggle);
  }, []);

  return (
    <>
      <Navbar onLoginClick={() => setShowAuth(true)} />
      <Hero onLoginClick={() => setShowAuth(true)} />
      <Features />

      {/* Scrollable Sections */}
      <CampaignCarousel title="🔥 Top Fundraisers" campaigns={topCampaigns} />
      <CampaignCarousel
        title="💰 Highest Funded Campaigns"
        campaigns={highestFunded}
      />

      <ContactSection />
      <Footer />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <ExplorePanel isOpen={showExplore} onClose={() => setShowExplore(false)} />
    </>
  );
}
