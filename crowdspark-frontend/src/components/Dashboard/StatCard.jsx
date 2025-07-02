import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="flex-1 min-w-[160px] bg-teal-100 rounded-xl p-6 text-center shadow hover:scale-105 transition-transform">
    <h3 className="text-lg font-semibold text-teal-900">{title}</h3>
    <p className="text-3xl font-bold text-teal-700 mt-2">{value}</p>
  </div>
);

export default StatCard;
