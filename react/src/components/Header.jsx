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
        <div className="flex-shrink-0 flex justify-center items-center mx-auto" style={{width: '98px'}}>
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
                  <div style={{
                    position: "fixed",
                    top: 65,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.18)",
                    zIndex: 2000,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    animation: "fadeIn 0.3s"
                  }}
                  onClick={() => setShowActivate(false)}
                  >
                    <div
                      style={{
                        marginTop: 32,
                        background: "#fff",
                        borderRadius: 16,
                        boxShadow: "0 8px 48px 0 rgba(0,0,0,0.18)",
                        padding: 32,
                        minWidth: 340,
                        maxWidth: "90vw",
                        position: "relative",
                        animation: "modalIn 0.35s cubic-bezier(.77,0,.18,1)"
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "#f5f5f5",
                          border: "none",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          fontSize: 20,
                          color: "#222",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)"
                        }}
                        onClick={() => setShowActivate(false)}
                        aria-label="Close"
                      >×</button>
                      <div style={{ fontFamily: 'Montserrat, Roboto, Arial, sans-serif', fontWeight: 700, fontSize: 22, color: '#1b1b1b', marginBottom: 18, textAlign: 'center', letterSpacing: 0.5 }}>ACTIVATE PROMO CODE</div>
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
                        style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
                        autoComplete="off"
                      >
                        <input
                          type="text"
                          placeholder="Enter promo code"
                          value={promo}
                          onChange={e => { setPromo(e.target.value); setPromoTouched(false); setPromoOk(false); }}
                          style={{
                            padding: "12px 18px",
                            fontSize: 17,
                            borderRadius: 7,
                            border: promoTouched && !promoOk ? "1.5px solid #c00" : "1.5px solid #e0e7ef",
                            outline: "none",
                            fontFamily: 'Roboto, Arial, sans-serif',
                            background: "#f7f8fa",
                            width: 220,
                            marginBottom: 0
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            padding: "10px 0",
                            background: promoOk ? "#1b8833" : "#222",
                            color: "#fff",
                            border: "none",
                            borderRadius: 7,
                            fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
                            fontWeight: 500,
                            fontSize: 17,
                            cursor: "pointer",
                            width: 140,
                            letterSpacing: 0.2,
                            transition: "background 0.18s"
                          }}
                        >
                          {promoOk ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" fill="#1b8833"/><path d="M6.5 11.5L10 15L15.5 8.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              <span>Activated</span>
                            </span>
                          ) : "Activate"}
                        </button>
                        {promoTouched && !promoOk && (
                          <div style={{ color: "#c00", fontSize: 15, marginTop: 2 }}>Invalid promo code</div>
                        )}
                      </form>
                    </div>
                    <style>{`
                      @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                      }
                      @keyframes modalIn {
                        0% { opacity: 0; transform: scale(0.95); }
                        100% { opacity: 1; transform: scale(1); }
                      }
                    `}</style>
                  </div>
                )}
          <Link to="/account" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors mr-8 relative after:content-[''] after:absolute after:right-[-16px] after:top-1/2 after:-translate-y-1/2 after:w-px after:h-4 after:bg-gray-300 after:ml-4">ACCOUNT</Link>
          <button className="ml-4 h-[23px] w-[64px] px-6 bg-black text-white text-xs font-medium uppercase tracking-widest rounded-none">BUY</button>
        </div>
      </div>
    </header>
  );
};

export default Header;