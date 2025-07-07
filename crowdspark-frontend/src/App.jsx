import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import PrivateRoute from "./components/PrivateRoute";
import CreateCampaign from "./pages/CreateCampaign";

import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/profile";

import Dashboard from './pages/Dashboard';
import AllCampaigns from './pages/AllCampaigns';
import SavedCampaigns from './pages/SavedCampaigns';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';
import CampaignDetails from "./pages/CampaignDetails";


export default function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/create" 
          element={
            <PrivateRoute>
              <CreateCampaign />
            </PrivateRoute>
          } 
        />
{/* 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />

<Route
  path="/campaigns"
  element={
    <ProtectedRoute>
      <AllCampaigns />
    </ProtectedRoute>
  }
/>

        <Route
  path="/saved"
  element={
    <ProtectedRoute>
      <SavedCampaigns />
    </ProtectedRoute>
  }
/>

        <Route 
          path="/admin" 
          element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

      </Routes>
    </Router>
     
  );
}
