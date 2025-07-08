import React from 'react';
import { Navigate } from 'react-router-dom';

// ✅ This version always allows access during testing
const ProtectedRoute = ({ children }) => {
  const userId = 'mock-user'; // mock userId for development
  // Alternatively, you could use: const userId = true;

  return children;
};

export default ProtectedRoute;

