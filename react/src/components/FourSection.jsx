import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FourSection() {
  const navigate = useNavigate();
  const backgrounds = [
    "/img/background5.jpg",
    "/img/background2.png",
    "/img/background4.jpg"
  ];
  const [show, setShow] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = React.useRef();

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
      }, 700);
    }, 2500);
    return () => clearTimeout(timeoutRef.current);
  }, [bgIndex, backgrounds.length]);

  function handleDiscover(path) {
    navigate(path);
  }

  return (
    <section
      className="four-section-shell w-full flex flex-col items-center justify-center bg-cover bg-center relative"
    >
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
      <div className={
        "four-section-content relative z-10 flex flex-col items-center justify-center h-full hero-fade" +
        (show ? " show" : "")
      }>
        <h1 className="four-section-title">
          WELLNESS INNOVATION AT ITS SCIENTIFIC BEST.
        </h1>
        <div className="four-section-spacer" />
        <div className="four-section-actions flex flex-wrap mt-10 justify-center">
          <button className="hero-btn" onClick={() => handleDiscover("/supplement")}>SUPPLEMENT</button>
          <button className="hero-btn" onClick={() => handleDiscover("/laser")}>LASER</button>
        </div>
      </div>
    </section>
  );
}