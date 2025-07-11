import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar({ onLoginClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-600">
            CrowdSpark
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link to="/explore" className="text-gray-700 hover:text-green-600 transition">
              Explore
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition">
              About
            </Link>
            <Link to="/saved" className="text-gray-700 hover:text-green-600 transition">
              Saved Campaigns
            </Link>
            {user && (
              <Link to="/profile" className="text-gray-700 hover:text-green-600 transition">
                Profile
              </Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-green-600 transition">
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 pb-4">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="/explore" className="text-gray-700 hover:text-green-600">
              Explore
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link to="/saved" className="text-gray-700 hover:text-green-600">
              Saved Campaigns
            </Link>
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
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

export default Navbar;
