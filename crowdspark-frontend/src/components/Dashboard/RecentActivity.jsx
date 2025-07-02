import React from 'react';

const activities = [
  'Created campaign: Save the Oceans',
  'Donated ₹500 to Education For All',
  'Volunteered for Tree Plantation',
];

const RecentActivity = () => (
  <div className="mt-8">
    <h2 className="text-xl font-bold text-teal-800 mb-3">Recent Activity</h2>
    <ul className="list-disc pl-6 space-y-1 text-gray-700">
      {activities.map((activity, idx) => (
        <li key={idx}>{activity}</li>
      ))}
    </ul>
  </div>
);

export default RecentActivity;
