import PropTypes from 'prop-types';

export default function CampaignCarousel({ title, campaigns }) {
  return (
    <section className="my-10 px-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {campaigns.map((campaign, idx) => {
          const percentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

          return (
            <div key={idx} className="min-w-[300px] bg-white rounded-lg shadow-md p-4 flex-shrink-0">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{campaign.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{campaign.description.slice(0, 80)}...</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded mb-1 overflow-hidden">
                <div
                  className="h-3 bg-green-600"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-sm text-gray-700">
                ₹{campaign.raised.toLocaleString()} raised of ₹{campaign.goal.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ✅ PropTypes validation
CampaignCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      raised: PropTypes.number.isRequired,
      goal: PropTypes.number.isRequired,
    })
  ).isRequired,
};