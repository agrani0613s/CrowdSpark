import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-yellow-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">CrowdSpark</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/campaigns" className="text-gray-700 hover:text-indigo-600">Explore</Link>
          <Link to="/create" className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Login</Link>
        </div>
      </div>
    </nav>
  );
}
