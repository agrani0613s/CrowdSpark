// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";

const mockUser = {
  name: "Neha Sharma",
  email: "neha@example.com",
  stats: {
    events: 12,
    donations: 54,
    volunteers: 30,
    campaigns: 5,
  },
  activity: [
    { type: "📢", text: "Created campaign: Save the Oceans" },
    { type: "💰", text: "Donated ₹500 to Education For All" },
    { type: "🌱", text: "Volunteered for Tree Plantation" },
  ],
  campaigns: [
    {
      title: "Save the Himalayas",
      description: "Reforestation and cleanup drive.",
    },
    {
      title: "Educate Every Girl",
      description: "Raising funds for school supplies.",
    },
    {
      title: "Flood Relief India",
      description: "Food and shelter for flood victims.",
    },
  ],
};

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Simulate API call
  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      setUser(mockUser);
    }, 500);
  }, []);

  if (!user) {
    return <div className="text-center p-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-700 mb-1">
          Welcome, {user.name}!
        </h1>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-gray-700 mt-2">
          Glad to see you back on <span className="font-semibold">CrowdSpark 💡</span>
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Events Created" value={user.stats.events} />
        <StatCard label="Donations Made" value={user.stats.donations} />
        <StatCard label="Volunteers Joined" value={user.stats.volunteers} />
        <StatCard label="Active Campaigns" value={user.stats.campaigns} />
      </section>

      {/* Recent Activity */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {user.activity.map((item, i) => (
            <li key={i}>
              <span className="mr-2">{item.type}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      {/* My Campaigns */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">My Campaigns</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {user.campaigns.map((camp, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-xl shadow-sm">
              <h3 className="text-green-700 font-bold text-lg">{camp.title}</h3>
              <p className="text-gray-600 mt-1">{camp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-xl font-semibold mb-3">What You Can Do Here:</h2>
        <ul className="space-y-2 text-gray-700">
          <li>🔍 Discover local events and initiatives</li>
          <li>📈 Track your donations and contributions</li>
          <li>🤝 Connect with organizers and volunteers</li>
          <li>📰 Stay updated with community news</li>
        </ul>
      </section>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-teal-100 rounded-xl shadow-sm p-4 text-center">
    <div className="text-2xl font-bold text-green-700">{value}</div>
    <div className="text-sm font-medium text-gray-700 mt-1">{label}</div>
  </div>
);

export default Dashboard;
