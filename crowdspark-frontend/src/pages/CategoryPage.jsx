import { useParams } from "react-router-dom";

const dummyCampaigns = [
  // Sample campaign objects with category
  { title: "School Kit Drive", category: "education", goal: 50000, raised: 25000, description: "Help underprivileged children get school supplies." },
  { title: "Solar Lights", category: "education", goal: 20000, raised: 18000, description: "Provide lights for village schools." },
];

export default function CategoryPage() {
  const { categoryName } = useParams();
  const campaigns = dummyCampaigns.filter(c => c.category === categoryName);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-6 capitalize">{categoryName} Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((c, idx) => {
          const percentage = Math.min((c.raised / c.goal) * 100, 100);
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="text-gray-600 mb-2">{c.description}</p>
              <div className="w-full bg-gray-200 h-3 rounded mb-1">
                <div className="bg-green-600 h-3" style={{ width: `${percentage}%` }} />
              </div>
              <p className="text-sm text-gray-700">
                ₹{c.raised.toLocaleString()} raised of ₹{c.goal.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
