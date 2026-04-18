import React, { useRef, useEffect, useState } from "react";

export default function FacePage() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="facepage-container" ref={ref}>
      <div className="facepage-images">
        <div className={`face-side face-side-left${visible ? " animated" : ""}`} style={{ position: "relative" }}>
          <img src="/img/face1.png" />
          <div className="face-img-overlay"></div>
          <div className={`face-overlay-content${visible ? " animated" : ""}`}>
            <div className="supplement-title">SUPPLEMENT</div>
            <div className="supplement-desc1">Nine powerful ingredients.</div>
            <div className="supplement-desc2">One ultimate formula.</div>
            <div className="supplement-buttons">
              <button className="discover-btn">DISCOVER</button>
              <button className="buy-btn">BUY</button>
            </div>
          </div>
        </div>
        <div className="facepage-divider" />
        <div className={`face-side face-side-right${visible ? " animated" : ""}`} style={{ position: "relative" }}>
          <img src="/img/face2.png" />
          <div className="face-img-overlay"></div>
          <div className={`face-overlay-content${visible ? " animated" : ""}`}>
            <div className="supplement-title">LASER</div>
            <div className="supplement-desc1">Ultimate skin regeneration.</div>
            <div className="supplement-desc2">A new dawn for beauty.</div>
            <div className="supplement-buttons">
              <button className="discover-btn">DISCOVER</button>
              <button className="buy-btn">BUY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}