import Navbar from "../components/Navbar";
import Features from "../components/Features";
import AboutImage from '../assets/pexels-diva-plavalaguna-6146693.jpg';

export default function About() {
  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-90"
        style={{
          backgroundImage: `url(${AboutImage})`,
        }}
      ></div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 bg-white/90 backdrop-blur-lg rounded-lg shadow-xl mt-8">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
          🌟 About CrowdSpark
        </h1>

        <p className="text-lg text-gray-800 mb-4 text-center">
          CrowdSpark is a community-powered crowdfunding platform that connects dreamers and backers.
        </p>
        <p className="text-lg text-gray-800 mb-4 text-center">
          Whether you’re a creator with a powerful idea or a supporter who believes in change, this is your platform.
        </p>
        <p className="text-lg text-gray-800 mb-8 text-center">
          Our mission is to support innovation, uplift communities, and bring bold visions to life.
        </p>

        <Features />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
            📣 Stories from Creators
          </h2>
          <div className="space-y-4 text-center text-gray-700">
            <p className="italic">“CrowdSpark helped me raise ₹5 lakh for building solar lamps in rural schools.”</p>
            <p className="italic">“Thanks to the platform, our women-led startup gained early traction and funds.”</p>
          </div>
        </div>
      </div>
    </div>
  );
}
