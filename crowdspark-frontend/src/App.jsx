import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import CreateCampaign from "./pages/CreateCampaign";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/profile";

export default function App() {
  return (
    <Router>

      {/* Route declarations */}
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
