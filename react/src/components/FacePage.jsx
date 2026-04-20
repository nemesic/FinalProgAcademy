import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

export default function FacePage() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  function handleDiscover(path) {
    navigate(path);
  }

  function handleBuy(product) {
    const cart = readCart();
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = (Number(cart[existingIndex].quantity) || 0) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  }

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="facepage-container" id="facepage-container" ref={ref}>
      <div className="facepage-images">
        <div className={`face-side face-side-left face-side-frame${visible ? " animated" : ""}`}>
          <img src="/img/face1.png" />
          <div className="face-img-overlay"></div>
          <div className={`face-overlay-content${visible ? " animated" : ""}`}>
            <div className="supplement-title">SUPPLEMENT</div>
            <div className="supplement-desc1">Nine powerful ingredients.</div>
            <div className="supplement-desc2">One ultimate formula.</div>
            <div className="supplement-buttons">
              <button className="discover-btn" onClick={() => handleDiscover("/supplement")}>DISCOVER</button>
              <button
                className="buy-btn"
                onClick={() =>
                  handleBuy({
                    id: "supplement-lyma",
                    name: "LYMA Supplement Refills (30 Days)",
                    type: "Supplement",
                    price: 190.9,
                    img: "/img/face1.png"
                  })
                }
              >
                BUY
              </button>
            </div>
          </div>
        </div>
        <div className="facepage-divider" />
        <div className={`face-side face-side-right face-side-frame${visible ? " animated" : ""}`}>
          <img src="/img/face2.png" />
          <div className="face-img-overlay"></div>
          <div className={`face-overlay-content${visible ? " animated" : ""}`}>
            <div className="supplement-title">LASER</div>
            <div className="supplement-desc1">Ultimate skin regeneration.</div>
            <div className="supplement-desc2">A new dawn for beauty.</div>
            <div className="supplement-buttons">
              <button className="discover-btn" onClick={() => handleDiscover("/laser")}>DISCOVER</button>
              <button
                className="buy-btn"
                onClick={() =>
                  handleBuy({
                    id: "laser-lyma",
                    name: "LYMA Laser (Medical Grade)",
                    type: "Laser",
                    price: 2499,
                    img: "/img/face2.png"
                  })
                }
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}