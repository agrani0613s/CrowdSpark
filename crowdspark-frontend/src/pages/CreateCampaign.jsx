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
      // Optionally reset form
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
      window.location.href = "/profile"; // ✅ or replace with navigate("/profile") if using react-router
      }, 2000);
      
    } catch (err) {
      console.error("Error creating campaign:", err);
      setStatus("❌ Failed to submit campaign.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{
          backgroundImage: `url(${CampaignImage})`,
        }}
      ></div>

      <div className="relative z-10 w-full max-w-3xl p-8 bg-yellow-50/90 backdrop-blur-md rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Start a New Campaign</h2>

          {status && (
          <div className={`text-center text-sm font-semibold mb-4 ${status.startsWith("✅") ? "text-green-700" : "text-red-600"}`}>
            {status}
          </div>
  )}

        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Campaign Title"
            required
            className="w-full border rounded-md px-4 py-2 text-center"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your campaign..."
            rows={5}
            required
            className="w-full border rounded-md px-4 py-2 text-center"
          />

          <button
             type="button"
             onClick={handleGenerateDescription}
             className="bg-green-600 text-white px-5 py-1 rounded-md hover:bg-purple-700 w-half"
          > 
            ✨ Generate with AI
          </button>

          <input
            type="number"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="Funding Goal (USD)"
            required
            className="w-full border rounded-md px-4 py-2 text-center" 
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 text-center"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 text-center"
          >
            <option value="">Select a Category</option>
            <option value="tech">Tech</option>
            <option value="art">Art</option>
            <option value="social">Social Impact</option>
            <option value="education">Education</option>
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-center"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full"
          >
            Launch Campaign
          </button>
        </form>
      </div>
    </div>
  );
}
