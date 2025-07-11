import { Link } from "react-router-dom";
import "./Footer.css"; // We'll create this next

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">CrowdSpark</span>
          <p className="footer-tagline">
            Empowering ideas. Fueling impact.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/about">About</Link>
          <Link to="/saved">Saved Campaigns</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} CrowdSpark. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
