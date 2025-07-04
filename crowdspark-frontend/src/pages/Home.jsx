import {useState} from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <>
      <Navbar onLoginClick={() => setShowAuth(true)}  />
      <Hero onLoginClick={() => setShowAuth(true)}  />
      <Features />
      <Footer />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
