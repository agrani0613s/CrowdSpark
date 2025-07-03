import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const categories = ["Health", "Education", "Environment", "Technology", "Art", "Others"];

export default function ExplorePanel({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex">
        <div className="w-80 bg-white p-6">
          <h2 className="text-xl font-bold mb-4 text-green-600">Explore Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    navigate(`/category/${cat.toLowerCase()}`);
                    onClose();
                  }}
                  className="text-left w-full text-gray-700 hover:text-green-600"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Background overlay */}
        <div
          className="flex-1"
          role="button"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onClose();
          }}
        />
      </div>
    )
  );
}

ExplorePanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};