import { useState } from "react";
import axios from "../api/axios"; // ✅ Use centralized axios instance
import PropTypes from 'prop-types';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, payload);

      // ✅ Store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // // ✅ Save token + user info together
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     token: res.data.token,
      //     name: res.data.user?.name,
      //     email: res.data.user?.email,
      //   })
      // );

      setMessage(isLogin ? "✅ Logged in successfully!" : "✅ Registered successfully!");

      setTimeout(() => {
        setMessage("");
        onClose();
        window.location.reload();
      }, 1500);

    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ Login/Signup failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          {isLogin ? "Login to CrowdSpark" : "Create Your Account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              onChange={handleChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              </>
            
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-blue-600">
            {message}
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-green-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AuthModal;
