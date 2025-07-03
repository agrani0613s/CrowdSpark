import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useMock, setUseMock] = useState(true); // ✅ Toggle for mock signup
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (useMock) {
      // ✅ MOCK SIGNUP: Set fake userId
      localStorage.setItem("userId", "mock-user-id-123");
      navigate("/dashboard"); // or "/"
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", {
          email,
          password,
        });

        const { user } = response.data;

        // ✅ Automatically log in after signup
        localStorage.setItem("userId", user._id);
        navigate("/dashboard"); // or "/"
      } catch (err) {
        alert("Signup failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Sign Up for CrowdSpark
        </h2>

        {/* 🟢 Toggle for Mock Signup */}
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Use Mock Signup
          </label>
          <input
            type="checkbox"
            checked={useMock}
            onChange={() => setUseMock(!useMock)}
            className="h-4 w-4"
          />
        </div>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-teal-500 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
