import Signup from "./pages/SignUp";
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCampaign from "./pages/CreateCampaign";
import Dashboard from './pages/Dashboard';
import AllCampaigns from './pages/AllCampaigns';
import SavedCampaigns from './pages/SavedCampaigns';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';


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
        <Route path="/about" element={<About />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

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
      </Routes>
    </Router>
     
  );
}
