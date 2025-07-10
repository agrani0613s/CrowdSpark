import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

try {
  const baseURL = import.meta.env.DEV
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_URL;

  const res = await axios.post(`${baseURL}/api/auth/signup`, formData);

  if (res.data && res.data.user && res.data.token) {
    const { user, token } = res.data;

    localStorage.setItem("user", JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    }));

    navigate("/dashboard");
  } else {
    setError("Signup failed.");
  }
} catch (err) {
  console.error(err);
  setError("User already exists or server error.");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
