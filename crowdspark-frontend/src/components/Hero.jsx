import heroImage from '../assets/Hero.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // 👈 Import toast
import 'react-toastify/dist/ReactToastify.css'; // 👈 Import styles
import { useAuth } from '../context/AuthContext.jsx';

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartCampaign = () => {
    if (user) {
      // User is logged in → navigate to create campaign page
      navigate('/create');
    } else {
      toast.error('⚠️ Please login to create a campaign', {
        position: 'top-center',
        duration: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-32 relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-yellow-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold">Igniting Ideas, Fueling Innovation</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Launch your project or support a cause you believe in. Join a global community transforming ideas into reality.
        </p>
        <div className="mt-6">
          {/* <a
            href={handleStartCampaign}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-lg"
          >
            Start a Campaign
          </a> */}
          <button
      onClick={handleStartCampaign}
      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-lg"
    >
      Start a Campaign
    </button>
        </div>
      </div>
    </section>
  );
}
