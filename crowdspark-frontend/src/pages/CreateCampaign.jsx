import { useState } from "react";
import CampaignImage from '../assets/CreateCampaignPage.jpg';
import axios from '../api/axios';

export default function CreateCampaign() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    category: "",
    image: null,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleGenerateDescription = async () => {
    if (!form.title) {
      alert("Please enter a campaign title first.");
      return;
    }

    setStatus("🔄 Generating description...");

    try {
      const res = await axios.post('/generate-description', {
        title: form.title,
      });

      setForm({ ...form, description: res.data.description });
      setStatus("✅ Description generated!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to generate description.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const response = await axios.post('/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Campaign created:", response.data);
      setStatus("✅ Campaign successfully submitted!");

      setForm({
        title: "",
        description: "",
        goal: "",
        deadline: "",
        category: "",
        image: null,
      });

      setTimeout(() => {
        setStatus("");
        window.location.href = "/profile";
      }, 2000);

    } catch (err) {
      console.error("Error creating campaign:", err);
      setStatus("❌ Failed to submit campaign.");
    }
  };

  return (
    <>
      {/* Back to Home button */}
      <div className="absolute top-4 left-4 z-20">
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition text-sm font-semibold"
        >
          ← Back to Home
        </a>
      </div>

      {/* Form Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden p-4">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{ backgroundImage: `url(${CampaignImage})` }}
        ></div>

        <div className="relative z-10 w-full max-w-4xl p-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-extrabold text-green-700 text-center mb-6">
            🚀 Start a New Campaign
          </h2>

          {status && (
            <div className={`text-center text-sm font-semibold mb-4 ${status.startsWith("✅") ? "text-green-700" : "text-red-600"}`}>
              {status}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Campaign Title"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your campaign goals, mission, and impact..."
              rows={5}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={handleGenerateDescription}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition w-full"
            >
              ✨ Generate Description with AI
            </button>

            <input
              type="number"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              placeholder="Funding Goal (INR)"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a Category</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="tech">Technology</option>
              <option value="art">Art</option>
              <option value="social">Social Impact</option>
              <option value="others">Other</option>
            </select>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-semibold text-lg transition w-full"
            >
              🎯 Launch Campaign
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
