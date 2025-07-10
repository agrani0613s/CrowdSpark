import { useEffect, useState } from "react";
import axios from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?._id) {
      fetchUserCampaigns();
      fetchUserProfile(storedUser._id);
      fetchUserDonations();
    }
  }, []);

  // if (storedUser) {
  //     setFormData({
  //       name: storedUser.name || "",
  //       email: storedUser.email || "",
  //       phone: storedUser.phone || "",
  //     });
  //     fetchUserCampaigns(storedUser._id);
  //     fetchUserDonations();
  //   }
  // }, []);

  // ✅ Fetch only campaigns created by logged-in user
  const fetchUserCampaigns = async () => {
    try {
      // const token = JSON.parse(localStorage.getItem("token"));
      const token = localStorage.getItem("token");

      const res = await axios.get("/campaigns/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching user campaigns", err);
    }
  };

  // const fetchUserProfile = async (userId) => {
  //   try {
  //     const res = await axios.get(`/users/${userId}/profile`);
  //     setUser(res.data);
  //   } catch (err) {
  //     console.error("Error fetching profile", err);
  //   }
  // };

  
  
  // const fetchUserProfile = async () => {
  //   try {
  //     const res = await axios.get(`/users/${user._id}`);
  //     setUser(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch user profile:", err);
  //   }
  // };

  // if (user && user._id) {
  //   fetchUserProfile();
  // }

  const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/users/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  } catch (err) {
    console.error("Failed to fetch user profile:", err);
  }
};


const fetchUserDonations = async () => {
    try {
      const res = await axios.get(`/donations/my`);
      setDonations(res.data);
    } catch (err) {
      console.error("Error fetching donations", err);
    }
  };

  // const handleProfilePicChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("profilePic", file);

  //   try {
  //     const res = await axios.post(`/users/${user._id}/profile-pic`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     setUser(res.data.user);
  //     alert("Profile picture updated!");
  //   } catch (err) {
  //     console.error("Error uploading profile picture", err);
  //   }
  // };

  const handleProfilePicChange = async (e) => {
  const file = e.target.files[0];
  if (!file || !user?._id) return;

  const formData = new FormData();
  formData.append("profilePic", file);

  try {
    const res = await axios.post(`/api/users/${user._id}/profile-pic`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUser(res.data.user);
    alert("Profile picture updated!");
  } catch (err) {
    console.error("Error uploading profile picture", err);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        "/auth/update",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [preferences, setPreferences] = useState([]);
  const [suggestedCampaigns, setSuggestedCampaigns] = useState([]);

  const categories = ['technology', 'art', 'social impact', 'education', 'health', 'environment', 'others'];

  const handleCheckboxChange = (category) => {
    setPreferences(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleSetPreferences = async () => {
    if (preferences.length === 0) {
      alert('Please select at least one category');
      return;
    }

    try {
      const res = await axios.post('/suggested-campaigns', { preferences });
      setSuggestedCampaigns(res.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      alert('Failed to load suggestions');
    }
  };

  const backendUrl = "http://localhost:5000"; // Replace with your prod URL when deployed
const profilePicSrc = user?.profilePic
  ? user.profilePic.startsWith("/uploads/")
    ? `${backendUrl}${user.profilePic}`
    : user.profilePic
  : "/default-avatar.png";


  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* <div className="flex items-center space-x-6"> */}
        {/* <div className="relative"> */}
          {/* <img
            src={user?.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
            title="Change Profile Picture"
          /> */}
        {/* </div> */}

        {/* Profile Section */}
<div className="flex items-center space-x-6">
  <div className="relative">
    <img
      src={profilePicSrc}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
    />
    <input
      type="file"
      accept="image/*"
      onChange={handleProfilePicChange}
      className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
      title="Change Profile Picture"
    />
  </div>


        {/* <div>
          <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
          <p className="text-gray-600 mt-1">📧 {user?.email}</p>
          <p className="text-gray-600">
            📱 {user?.phone || "Phone not added"}
          </p>
           <p className="text-gray-600">
            💼 {user?.occupation || "Occupation not added"}
          </p> 
          <p className="text-gray-600">
            Role: {user?.isAdmin ? "Admin" : "User"}
          </p>
          <p className="mt-2 text-green-700 font-semibold">
            Donations Made: {donations.length}
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div> */}
        <div>
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="block border p-2 rounded mb-2 w-72"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="block border p-2 rounded mb-2 w-72"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone (e.g., 98765-43210)"
                pattern="[0-9]{5}-[0-9]{5}" 
                className="block border p-2 rounded mb-2 w-72"
              />
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
              <p className="text-gray-600 mt-1">📧 {user?.email}</p>
              <p className="text-gray-600">
                📱 {user?.phone || "Phone not added"}
              </p>
              <p className="text-gray-600">
                Role: {user?.isAdmin ? "Admin" : "User"}
              </p>
              <p className="mt-2 text-green-700 font-semibold">
            Donations Made: {donations.length}
          </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {/* const backendBaseURL = import.meta.env.VITE_API_URL; */}


      {/* My Fundraisers */}
      <h3 className="mt-8 text-xl font-semibold">Your Campaigns:</h3>
{campaigns.length === 0 ? (
  <p className="text-gray-500 mt-2">
    You haven’t posted any campaigns yet.
  </p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {campaigns.map((campaign) => (
      <div
        key={campaign._id}
        className="border rounded-md p-4 shadow hover:shadow-lg transition"
      >
        <h4 className="font-bold text-lg">{campaign.title}</h4>
        <p className="text-sm text-gray-600">{campaign.category}</p>
        <img
          src={`${backendUrl}${campaign.image}`|| "/default-campaign.jpeg"}
          alt={campaign.title}
          className="w-full h-40 object-cover rounded mt-2"
        />
        <p className="mt-2 text-gray-700">{campaign.description}</p>
        <p className="mt-1 text-sm text-gray-500">
          Goal: ₹{campaign.goal}
        </p>
        <p className="text-sm text-gray-500">
          Deadline: {new Date(campaign.deadline).toLocaleDateString()}
        </p>
      </div>
    ))}
  </div>
)}


      {/* suggested campaigns */}

      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Set Your Preferences</h2>

      <div className="flex gap-4 mb-4">
        {categories.map(cat => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.includes(cat)}
              onChange={() => handleCheckboxChange(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <button
        onClick={handleSetPreferences}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Set Preferences
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Suggested Campaigns:</h3>
        {suggestedCampaigns.length === 0 ? ( <p>No suggestions yet.</p> ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {suggestedCampaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="border rounded-md p-4 shadow hover:shadow-lg transition"
            >
              <h4 className="font-bold text-lg">{campaign.title}</h4>
              <p className="text-sm text-gray-600">{campaign.category}</p>
              <img
                src={`${backendUrl}${campaign.image}` || "/default-campaign.jpeg"}
                alt={campaign.title}
                className="w-full h-40 object-cover rounded mt-2"
              />
              <p className="mt-2 text-gray-700">{campaign.description}</p>
              <p className="mt-1 text-sm text-gray-500">
                Goal: ₹{campaign.goal}
              </p>
              <p className="text-sm text-gray-500">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>

      {/* My Donations */}
      <h3 className="mt-10 text-xl font-semibold">My Donations</h3>
      {donations.length === 0 ? (
        <p className="text-gray-500 mt-2">
          You haven’t donated to any campaigns yet.
        </p>
      ) : (
        <div className="flex overflow-x-auto space-x-4 mt-4 scrollbar-hide">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="min-w-[250px] bg-white rounded shadow p-4 flex-shrink-0 hover:shadow-md transition"
            >
              <img
                src={donation.campaign.image || "/default-campaign.jpeg"}
                alt={donation.campaign.title}
                className="h-32 w-full object-cover rounded"
              />
              <h4 className="font-bold mt-2">{donation.campaign.title}</h4>
              <p className="text-sm text-gray-600">
                You donated ₹{donation.amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
