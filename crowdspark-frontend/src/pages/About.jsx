// About.jsx
import Features from "../components/Features";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6">About CrowdSpark</h1>
      <p className="mb-4">
        CrowdSpark is a community-powered crowdfunding platform that connects dreamers and backers.
      </p>
      <p className="mb-4">
        Whether you’re a creator with a powerful idea or a supporter who believes in change, this is your platform.
      </p>
      <p className="mb-4">
        Our mission is to support innovation, uplift communities, and bring bold visions to life.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Stories from Creators</h2>
      <p className="mb-2">“CrowdSpark helped me raise ₹5 lakh for building solar lamps in rural schools.”</p>
      <p>“Thanks to the platform, our women-led startup gained early traction and funds.”</p>

      <Features />
      
    </div>
  );
}
