import React from 'react';

const ProfileSummary = ({ user }) => (
  <div className="flex items-center gap-4 p-6 bg-teal-50 rounded-lg shadow">
    <img
      src={user.avatar || 'https://via.placeholder.com/80'}
      alt="User"
      className="w-20 h-20 rounded-full object-cover"
    />
    <div>
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
    </div>
  </div>
);

export default ProfileSummary;
