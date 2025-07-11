import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartCampaign = () => {
    if (user) {
      navigate('/create');
    } else {
      toast.error('⚠️ Please login to create a campaign', {
        position: 'top-center',
        duration: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden">

      {/* ✅ Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/heroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* ✅ Main Content */}
      <div className="relative z-20 max-w-4xl px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Igniting Ideas, Fueling Innovation
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          Launch your project or support a cause you believe in. Join a global community
          turning ideas into real-world impact.
        </p>
        <button
          onClick={handleStartCampaign}
          className="mt-8 bg-green-600 hover:bg-green-700 transition duration-200 text-white font-medium px-8 py-3 rounded-lg shadow-lg"
        >
          🚀 Start a Campaign
        </button>
      </div>
    </section>
  );
}
