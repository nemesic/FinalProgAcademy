import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import smoothScrollToSection from "./SmoothScrollToSection";

const backgrounds = [
  "/img/background.png",
  "/img/background2.png",
  "/img/background3.png"
];

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleFaceScroll(sectionId) {
    return (e) => {
      e?.preventDefault?.();
      if (location.pathname !== "/") {
        navigate("/", { replace: false });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            smoothScrollToSection(sectionId);
          });
        });
      } else {
        smoothScrollToSection(sectionId);
      }
    };
  }
  const [show, setShow] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
        setFade(true);
      }, 500); 
    }, 3000); 
    return () => clearTimeout(timeoutRef.current);
  }, [bgIndex]);

  return (
    <section id="hero-section" className="hero-section-shell w-full flex flex-col items-center justify-center bg-cover bg-center relative">
      {backgrounds.map((bg, i) => (
        <div
          key={bg}
          className={
            "hero-bg-fade absolute inset-0 w-full h-full bg-cover bg-center" +
            (i === bgIndex && fade ? " show" : "") +
            (i === bgIndex && !fade ? " hide" : "")
          }
        >
          <img src={bg} alt="" className="hero-bg-media" />
        </div>
      ))}
      <div className="hero-overlay-layer" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1
          className={
            `hero-title-shell text-white font-roboto font-normal text-[57px] leading-none tracking-[0.8px] text-center drop-shadow-lg mb-6 hero-fade` +
            (show ? " show" : "")
          }
        >
          THE FUTURE OF WELLNESS.
        </h1>
        <p
          className={
            `hero-description-shell text-white font-montserrat font-normal text-[18px] leading-[30px] tracking-[0.44px] text-center drop-shadow pb-[50px] hero-fade` +
            (show ? " show" : "")
          }
        >
          The perfect balance of science, nature and technology. Prepare to look and feel your absolute best.
        </p>
        <div className={
          `flex flex-wrap gap-6 mt-10 justify-center hero-fade` +
          (show ? " show" : "")
        }>
          <button className="hero-btn" onClick={handleFaceScroll("facepage-container")}>SUPPLEMENT</button>
          <button className="hero-btn" onClick={handleFaceScroll("facepage-container")}>LASER</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;