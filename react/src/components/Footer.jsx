import React from "react";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#" className="footer-link">SUPPLEMENT</a>
          <a href="#" className="footer-link">LASER</a>
          <a href="#" className="footer-link">REVIEWS</a>
          <a href="#" className="footer-link">JOURNAL</a>
          <a href="#" className="footer-link">ABOUT</a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} LYMA. All rights reserved.</div>
      </div>
    </footer>
  );
}
