// import PropTypes from 'prop-types';
// import { useNavigate } from "react-router-dom";

// export default function CampaignCarousel({ title, campaigns }) {

//   const placeholderImage = "/default-campaign.jpeg";
//   const navigate = useNavigate();

//   const handleCardClick = (id) => {
//   if (!id) {
//     console.error("Campaign ID is missing!");
//     return;
//   }
//   navigate(`/campaign/${id}`);
// };

//   return (
//     <section className="my-10 px-6">
//       <h2 className="text-2xl font-bold mb-4">{title}</h2>
//       <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
//         {campaigns.map((campaign, idx) => {
//           const percentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

//           return (
//             <button
//               key={idx}
//               type="button"
//               onClick={() => handleCardClick(campaign._id)}
//               className="min-w-[300px] bg-white rounded-lg shadow-md p-4 flex-shrink-0 cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               <img
//                 src={campaign.image || placeholderImage}
//                 alt={campaign.title}
//                 onError={(e) => { e.target.src = placeholderImage; }}
//                 className="h-40 w-full object-cover rounded"
//               />
//               <h3 className="text-lg font-semibold mt-2">{campaign.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">
//                 {campaign.description.slice(0, 80)}...
//               </p>

//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 h-3 rounded mb-1 overflow-hidden">
//                 <div
//                   className="h-3 bg-green-600"
//                   style={{ width: `${percentage}%` }}
//                 />
//               </div>

//               <p className="text-sm text-gray-700">
//                 ₹{campaign.raised.toLocaleString()} raised of ₹{campaign.goal.toLocaleString()}
//               </p>
//             </button>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// // ✅ PropTypes validation
// CampaignCarousel.propTypes = {
//   title: PropTypes.string.isRequired,
//   campaigns: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       raised: PropTypes.number.isRequired,
//       goal: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export default function CampaignCarousel({ title, campaigns }) {
  const placeholderImage = "/default-campaign.jpeg";
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    if (!id) {
      console.error("Campaign ID is missing!");
      return;
    }
    navigate(`/campaign/${id}`);
  };

  return (
    <section className="my-10 px-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {campaigns.map((campaign, idx) => {
          // 🛡 Defensive fallback for raised and goal
          const raised = typeof campaign.raised === "number" ? campaign.raised : 0;
          const goal = typeof campaign.goal === "number" ? campaign.goal : 1; // avoid div by 0
          const percentage = Math.min((raised / goal) * 100, 100);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleCardClick(campaign._id)}
              className="min-w-[300px] bg-white rounded-lg shadow-md p-4 flex-shrink-0 cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <img
                src={campaign.image || placeholderImage}
                alt={campaign.title || "Campaign"}
                onError={(e) => { e.target.src = placeholderImage; }}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">
                {campaign.title || "Untitled Campaign"}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {(campaign.description || "No description").slice(0, 80)}...
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded mb-1 overflow-hidden">
                <div
                  className="h-3 bg-green-600"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-sm text-gray-700">
                ₹{raised.toLocaleString()} raised of ₹{goal.toLocaleString()}
              </p>
            </button>
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
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      raised: PropTypes.number,
      goal: PropTypes.number,
      _id: PropTypes.string
    })
  ).isRequired,
};
