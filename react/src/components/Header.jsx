import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import smoothScrollToSection from "./SmoothScrollToSection";
import { getCartItemsCount, readCart, subscribeToCartUpdates } from "./cartStorage";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoOk, setPromoOk] = useState(false);
  const [promoTouched, setPromoTouched] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartItemsCount(readCart()));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function syncCartCount() {
      setCartCount(getCartItemsCount(readCart()));
    }

    return subscribeToCartUpdates(syncCartCount);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleReviewsClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => smoothScrollToSection("last-section"), 100);
    } else {
      smoothScrollToSection("last-section");
    }
  };

  return (
    <header className={`header-fixed${scrolled ? " header-blur" : ""}`}>
      <div className="header-shell">
        {/* Left Navigation */}
        <nav className="header-nav header-nav-left">
          <Link to="/supplement" className="header-link">SUPPLEMENT</Link>
          <Link to="/laser" className="header-link">LASER</Link>
          <a href="/#last-section" onClick={handleReviewsClick} className="header-link">REVIEWS</a>
          <Link to="/journal" className="header-link">JOURNAL</Link>
          <Link to="/about" className="header-link">ABOUT</Link>
        </nav>
        {/* Logo Centered */}
        <div className="header-logo-block">
          <a
            href="/#hero-section"
            onClick={e => {
              e.preventDefault();
              if (location.pathname !== "/") {
                navigate("/", { replace: false });
                setTimeout(() => {
                  const el = document.getElementById("hero-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              } else {
                const el = document.getElementById("hero-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <img src="/img/lyma.png" alt="LYMA Logo" className="header-logo-image" />
          </a>
        </div>
        {/* Right Navigation */}
        <div className="header-nav header-nav-right">
          <Link to="/help" className="header-link">HELP & SUPPORT</Link>
          <Link
            to="#"
            className="header-link"
            onClick={e => { e.preventDefault(); setShowActivate(true); setPromo(""); setPromoOk(false); setPromoTouched(false); }}
          >
            ACTIVATE
          </Link>
                {showActivate && (
                  <div className="activate-modal-overlay" onClick={() => setShowActivate(false)}>
                    <div className="activate-modal" onClick={e => e.stopPropagation()}>
                      <button className="activate-modal-close" onClick={() => setShowActivate(false)} aria-label="Close">×</button>
                      <div className="page-eyebrow activate-modal-badge">Activate</div>
                      <div className="activate-modal-title">PROMO CODE</div>
                      <p className="activate-modal-text">
                        Enter your personal code below to activate a special offer before checkout.
                      </p>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          setPromoTouched(true);
                          if (promo.trim().toLowerCase() === "nemesic") {
                            setPromoOk(true);
                          } else {
                            setPromoOk(false);
                          }
                        }}
                        className="activate-modal-form"
                        autoComplete="off"
                      >
                        <input
                          type="text"
                          placeholder="Enter your promo code"
                          value={promo}
                          onChange={e => { setPromo(e.target.value); setPromoTouched(false); setPromoOk(false); }}
                          className={
                            "activate-modal-input" + (promoTouched && !promoOk ? " activate-modal-input-error" : "")
                          }
                        />
                        <div className="activate-modal-hint">Demo code: NEMESIC</div>
                        <button
                          type="submit"
                          className={promoOk ? "activate-modal-btn activate-modal-btn-success" : "activate-modal-btn"}
                        >
                          {promoOk ? (
                            <span className="activate-modal-btn-content">
                              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" fill="#1b8833"/><path d="M6.5 11.5L10 15L15.5 8.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              <span>Activated</span>
                            </span>
                          ) : "Activate"}
                        </button>
                        {promoTouched && !promoOk && (
                          <div className="activate-modal-error">Invalid promo code. Try NEMESIC.</div>
                        )}
                      </form>
                    </div>
                  </div>
                )}
          <Link to="/account" className="header-link header-link-account">ACCOUNT</Link>
          <Link to="/cart" className="header-buy-link" aria-label={`Open cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}>
            <span>BUY</span>
            {cartCount > 0 && <span className="header-cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;