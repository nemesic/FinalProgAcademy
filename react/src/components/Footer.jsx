import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import smoothScrollToSection from "./SmoothScrollToSection";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleSectionScroll(sectionId) {
    return (event) => {
      event.preventDefault();

      if (location.pathname !== "/") {
        navigate("/", { replace: false });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            smoothScrollToSection(sectionId);
          });
        });
        return;
      }

      smoothScrollToSection(sectionId); 
    };
  }

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/img/lyma.png" alt="LYMA" className="footer-logo-img" />
            <div className="footer-kicker">Science. Nature. Technology.</div>
            <h2 className="footer-title">Wellness products designed to feel premium from the first click to the first result.</h2>
            <p className="footer-description">
              Explore the LYMA collection, read reviews, and move through the main pages without dead links in the footer.
            </p>
            <div className="footer-actions">
              <Link to="/supplement" className="footer-cta footer-cta-primary">Shop Supplement</Link>
              <Link to="/laser" className="footer-cta footer-cta-secondary">Explore Laser</Link>
            </div>
          </div>

          <div className="footer-nav-block">
            <div className="footer-nav-title">Navigate</div>
            <div className="footer-links">
              <Link to="/supplement" className="footer-link">SUPPLEMENT</Link>
              <Link to="/laser" className="footer-link">LASER</Link>
              <a href="/#last-section" onClick={handleSectionScroll("last-section")} className="footer-link">REVIEWS</a>
              <Link to="/journal" className="footer-link">JOURNAL</Link>
              <Link to="/about" className="footer-link">ABOUT</Link>
            </div>
          </div>

          <div className="footer-nav-block">
            <div className="footer-nav-title">Support</div>
            <div className="footer-links">
              <Link to="/help" className="footer-link">HELP & SUPPORT</Link>
              <Link to="/account" className="footer-link">ACCOUNT</Link>
              <Link to="/cart" className="footer-link">CART</Link>
              <a href="/#hero-section" onClick={handleSectionScroll("hero-section")} className="footer-link">BACK TO TOP</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} LYMA. All rights reserved.
            <span className="footer-dev-credit">Developed by nemesic</span>
          </div>
          <div className="footer-meta">
            <Link to="/about" className="footer-meta-link">Brand Story</Link>
            <Link to="/help" className="footer-meta-link">Customer Care</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}