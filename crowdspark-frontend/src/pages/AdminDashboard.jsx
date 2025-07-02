import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const isAdmin = JSON.parse(localStorage.getItem('user'))?.role === 'admin';

  useEffect(() => {
    if (!token || !isAdmin) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const campaignRes = await axios.get('/api/admin/campaigns', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(userRes.data);
        setCampaigns(campaignRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  const handleUserAction = async (id, action) => {
    try {
      await axios.patch(`/api/admin/users/${id}`, { action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`User ${action}d`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCampaignAction = async (id, action) => {
    try {
      if (action === 'delete') {
        await axios.delete(`/api/admin/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.patch(`/api/admin/campaigns/${id}`, { action }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      alert(`Campaign ${action}d`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading admin dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Users Section */}
      <h2 className="text-xl font-semibold mt-6 mb-2">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="space-x-2">
                  {user.role !== 'admin' && (
                    <>
                      <button onClick={() => handleUserAction(user._id, 'approve')} className="bg-green-500 px-2 py-1 text-white rounded">
                        Approve
                      </button>
                      <button onClick={() => handleUserAction(user._id, 'reject')} className="bg-yellow-500 px-2 py-1 text-white rounded">
                        Reject
                      </button>
                      <button onClick={() => handleUserAction(user._id, 'delete')} className="bg-red-500 px-2 py-1 text-white rounded">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Campaigns Section */}
      <h2 className="text-xl font-semibold mt-10 mb-2">All Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th>Creator</th>
              <th>Status</th>
              <th>Goal</th>
              <th>Raised</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} className="border-t">
                <td className="px-4 py-2">{campaign.title}</td>
                <td>{campaign.creator?.username || 'N/A'}</td>
                <td>{campaign.status}</td>
                <td>${campaign.goal}</td>
                <td>${campaign.raised}</td>
                <td className="space-x-2">
                  <button onClick={() => handleCampaignAction(campaign._id, 'approve')} className="bg-green-500 px-2 py-1 text-white rounded">
                    Approve
                  </button>
                  <button onClick={() => handleCampaignAction(campaign._id, 'reject')} className="bg-yellow-500 px-2 py-1 text-white rounded">
                    Reject
                  </button>
                  <button onClick={() => handleCampaignAction(campaign._id, 'delete')} className="bg-red-500 px-2 py-1 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
