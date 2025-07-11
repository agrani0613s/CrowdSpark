import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CampaignCarousel.css'; // ⬅️ Add this

export default function CampaignCarousel({ title, campaigns }) {
  const navigate = useNavigate();
  const placeholderImage = "/default-campaign.jpeg";
  const backendBaseURL = import.meta.env.VITE_API_URL;

  const handleCardClick = (id) => {
    if (!id) return;
    navigate(`/campaign/${id}`);
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-container">
        {campaigns.map((campaign, idx) => {
          const raised = typeof campaign.raised === "number" ? campaign.raised : 0;
          const goal = typeof campaign.goal === "number" ? campaign.goal : 1;
          const percentage = Math.min((raised / goal) * 100, 100);
          const imageUrl = campaign.image?.startsWith("http")
            ? campaign.image
            : `${backendBaseURL}${campaign.image}` || placeholderImage;

          return (
            <div
              key={idx}
              className="campaign-card"
              onClick={() => handleCardClick(campaign._id)}
            >
              <img
                src={imageUrl}
                alt={campaign.title || 'Campaign'}
                onError={(e) => { e.target.src = placeholderImage; }}
                className="campaign-image"
              />
              <div className="campaign-content">
                <h3 className="campaign-title">{campaign.title || "Untitled Campaign"}</h3>
                <p className="campaign-desc">{campaign.description?.slice(0, 90) || "No description available..."}</p>

                <div className="progress-info">
                  <span>{percentage.toFixed(0)}% funded</span>
                  <span>₹{raised.toLocaleString()} / ₹{goal.toLocaleString()}</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

CampaignCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      raised: PropTypes.number,
      goal: PropTypes.number,
    })
  ).isRequired,
};
