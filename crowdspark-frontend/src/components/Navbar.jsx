import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

function Navbar({ onLoginClick }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-yellow-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">CrowdSpark</h1>

        <div className="flex items-center space-x-6">
          {/* Explore Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("toggleExplore"))}
            className="text-gray-700 hover:text-green-600 font-medium"
          >
            Explore
          </button>

          {/* Search Bar */}
          {/* <div className="relative">
            <label htmlFor="search" className="sr-only">
              Search campaigns
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search campaigns..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div> */}

          {/* Navigation Links */}
          <Link to="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>

          {/* <Link to="/dashboard" className="text-gray-700 hover:text-green-600">
            Dashboard
          </Link> */}

          <Link to="/saved" className="text-gray-700 hover:text-green-600">
            Saved Campaigns
          </Link>

          {/* <Link to="/campaigns" className="text-gray-700 hover:text-green-600">
            All Campaigns
          </Link> */}

          {user && (
            <Link to="/profile" className="text-gray-700 hover:text-green-600">
              Profile
            </Link>
          )}

          {user?.isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-green-600">
              Admin
            </Link>
          )}

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

export default Navbar;
