import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onLoginClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');   // 🔐 clear login
    navigate('/login');                 // 🔁 redirect
  };

  const isLoggedIn = !!localStorage.getItem('userId');

  return (
    <nav className="bg-yellow-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">CrowdSpark</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
          <Link to="/campaigns" className="text-gray-700 hover:text-green-600">Explore</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-green-600">Dashboard</Link>
          <Link to="/saved" className="text-gray-700 hover:text-green-600">Saved</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
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
