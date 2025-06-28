import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCampaign from "./pages/CreateCampaign";
import Dashboard from './pages/Dashboard';
import AllCampaigns from './pages/AllCampaigns';
import SavedCampaigns from './pages/SavedCampaigns';

<Route path="/saved" element={<SavedCampaigns />} />


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* ✅ fixed path */}
        <Route path="/campaigns" element={<AllCampaigns />} />
        <Route path="/saved" element={<SavedCampaigns />} />
      </Routes>
    </Router>
  );
}

