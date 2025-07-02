import Signup from "./pages/SignUp";
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCampaign from "./pages/CreateCampaign";
import Dashboard from './pages/Dashboard';
import AllCampaigns from './pages/AllCampaigns';
import SavedCampaigns from './pages/SavedCampaigns';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/campaigns" element={<AllCampaigns />} />
        <Route path="/saved" element={<SavedCampaigns />} />
      </Routes>
    </Router>
     
  );
}
