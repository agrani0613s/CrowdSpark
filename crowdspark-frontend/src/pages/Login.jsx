import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useMock, setUseMock] = useState(true); // ✅ Toggle for mock mode

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (useMock) {
      // ✅ MOCK LOGIN: Set fake userId
      localStorage.setItem("userId", "mock-user-id-123");
      navigate("/dashboard");
    } else {
      try {
        // 🔐 REAL LOGIN: Use actual backend API
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        const { user } = response.data;
        localStorage.setItem("userId", user._id);
        navigate("/dashboard");
      } catch (error) {
        alert("Login failed. Please check credentials.");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Login to CrowdSpark
        </h2>

        {/* 🟢 Toggle Switch for Mock Mode */}
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Use Mock Login
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
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
  Don't have an account?{" "}
  <a href="/signup" className="text-teal-500 font-medium hover:underline">
    Sign Up
  </a>
</p>
      </form>
    </div>
  );
};

export default Login;
