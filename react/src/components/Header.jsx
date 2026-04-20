import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import smoothScrollToSection from "./SmoothScrollToSection";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoOk, setPromoOk] = useState(false);
  const [promoTouched, setPromoTouched] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className={`header-fixed w-full h-[65px] flex items-center justify-center${scrolled ? " header-blur" : ""}`}>
      <div className="w-[1340px] h-[44px] flex items-center justify-between">
        {/* Left Navigation */}
        <nav className="flex items-center w-[455px] h-full gap-8 mr-8">
          <Link to="/supplement" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">SUPPLEMENT</Link>
          <Link to="/laser" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">LASER</Link>
          <a href="/#last-section" onClick={handleReviewsClick} className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">REVIEWS</a>
          <Link to="/journal" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">JOURNAL</Link>
          <Link to="/about" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">ABOUT</Link>
        </nav>
        {/* Logo Centered */}
        <div className="flex-shrink-0 flex justify-center items-center mx-auto header-logo-block">
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
            <img src="/img/lyma.png" alt="LYMA Logo" className="w-[98px] h-[13px] object-contain" />
          </a>
        </div>
        {/* Right Navigation */}
        <div className="flex items-center w-[455px] h-full gap-8 justify-end">
          <Link to="/help" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">HELP & SUPPORT</Link>
          <Link
            to="#"
            className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors"
            onClick={e => { e.preventDefault(); setShowActivate(true); setPromo(""); setPromoOk(false); setPromoTouched(false); }}
          >
            ACTIVATE
          </Link>
                {showActivate && (
                  <div className="activate-modal-overlay" onClick={() => setShowActivate(false)}>
                    <div className="activate-modal" onClick={e => e.stopPropagation()}>
                      <button className="activate-modal-close" onClick={() => setShowActivate(false)} aria-label="Close">×</button>
                      <div className="activate-modal-title">ACTIVATE PROMO CODE</div>
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
                          placeholder="Enter promo code"
                          value={promo}
                          onChange={e => { setPromo(e.target.value); setPromoTouched(false); setPromoOk(false); }}
                          className={
                            "activate-modal-input" + (promoTouched && !promoOk ? " activate-modal-input-error" : "")
                          }
                        />
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
                          <div className="activate-modal-error">Invalid promo code</div>
                        )}
                      </form>
                    </div>
                  </div>
                )}
          <Link to="/account" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors mr-8 relative after:content-[''] after:absolute after:right-[-16px] after:top-1/2 after:-translate-y-1/2 after:w-px after:h-4 after:bg-gray-300 after:ml-4">ACCOUNT</Link>
          <Link to="/cart" className="ml-4 h-[23px] w-[64px] px-6 flex items-center justify-center bg-black text-white text-xs font-medium uppercase tracking-widest rounded-none hover:bg-[#444] transition-colors">BUY</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;