import React, { useState, useEffect, useRef } from "react";

const images = [
  "/img/8.avif",
  "/img/9.avif"
];

const accordionData = [
  {
    title: "Why It's Cult",
    content: (
      <>
        The LYMA Laser is the world’s most powerful at-home beauty device, using medical-grade technology to transform skin. It’s the only laser that is completely safe for use on all skin tones and around the eyes, with no pain or downtime.
      </>
    )
  },
  {
    title: "Description",
    content: (
      <>
        The LYMA Laser harnesses near-infrared laser light to rejuvenate, firm, and smooth the skin. Clinically proven to reduce wrinkles, redness, pigmentation, and scars, it’s a revolution in non-invasive skin care.
      </>
    )
  },
  {
    title: "How it works",
    content: (
      <>
        The laser penetrates deep into the skin, stimulating cellular renewal and boosting collagen production. Results are visible within weeks and improve with continued use.
      </>
    )
  },
  {
    title: "How to use",
    content: (
      <>
        Glide the LYMA Laser slowly over clean, dry skin for 15 minutes daily. No goggles or gels required. Safe for use on face, neck, hands, and body.
      </>
    )
  },
  {
    title: "What’s included",
    content: (
      <>
        <ul className="product-feature-list">
          <li>LYMA Laser device</li>
          <li>Wireless charging base</li>
          <li>Power cable & plug</li>
          <li>Instruction manual</li>
          <li>Protective travel pouch</li>
        </ul>
      </>
    )
  },
  {
    title: "Warranty",
    content: (
      <>
        2-year manufacturer’s warranty included. Register your device for extended support.
      </>
    )
  },
  {
    title: "Contact",
    content: (
      <>
        support@lyma.life
      </>
    )
  }
];

function Accordion({ data }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="product-accordion">
      {data.map((item, idx) => (
        <div key={item.title} className="product-accordion-section">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="product-accordion-btn"
          >
            {item.title}
            <span className={`product-accordion-arrow${openIdx === idx ? " product-accordion-arrow-open" : ""}`}>›</span>
          </button>
          <div className={`product-accordion-content${openIdx === idx ? " product-accordion-content-open" : ""}`}>
            {openIdx === idx && <div>{item.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Laser() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState("");
  const toastTimeout = useRef();
  const intervalRef = useRef();

  const prevImg = () => setActiveIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
  const nextImg = () => setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));
      }, 3500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (toast) {
      toastTimeout.current = setTimeout(() => setToast(""), 1800);
    }
    return () => clearTimeout(toastTimeout.current);
  }, [toast]);


  function handleAddToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = {
      id: "laser-lyma",
      name: "LYMA Laser (Medical Grade)",
      price: 2499,
      quantity,
      img: images[activeIdx]
    };

    let totalQuantity = quantity;
    let lastImg = images[activeIdx];
    for (let i = cart.length - 1; i >= 0; --i) {
      if (cart[i].id === product.id) {
        totalQuantity += Number(cart[i].quantity) || 1;
        lastImg = cart[i].img || lastImg;
        cart.splice(i, 1);
      }
    }
    cart.push({ ...product, quantity: totalQuantity, img: images[activeIdx] });
    localStorage.setItem("cart", JSON.stringify(cart));
    setToast("Added to basket!");
  }

  return (
    <div className="laser-page">
      {/* Gallery/Slider */}
      <div className="product-layout">
        <div className="product-gallery-column">
          <div
            className="product-gallery-frame"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button onClick={prevImg} aria-label="Previous" className="product-nav-btn product-nav-btn-left">&#8249;</button>
            <img
              src={images[activeIdx]}
              alt={`LYMA laser photo ${activeIdx + 1}`}
              className="product-image"
            />
            <button onClick={nextImg} aria-label="Next" className="product-nav-btn product-nav-btn-right">&#8250;</button>
          </div>
          <div className="product-thumbs">
            {images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`thumb ${idx + 1}`}
                className={`laser-thumb${idx === activeIdx ? " laser-thumb-active" : ""}`}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="product-info-block">
          <h1 className="product-title-heading">
            LYMA Laser <span className="laser-title-sub">(Medical Grade)</span>
          </h1>
          <div className="product-price-text">2499.00₴</div>
          <div className="product-purchase-row">
            <button
              className="product-qty-btn"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              –
            </button>
            <span className="product-qty-value">x{quantity}</span>
            <button
              className="product-qty-btn"
              onClick={() => setQuantity(q => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
            <button className="product-add-btn" onClick={handleAddToCart}>
              ADD TO BASKET
            </button>
          </div>
          <div className="product-status">
            <span className="product-status-badge">In stock</span>
            <span className="product-status-text">| Usually dispatched within 24 hours</span>
          </div>
        </div>
      </div>
      {toast && <div className="page-toast">{toast}</div>}
      {/* Accordion Sections Below */}
      <div className="product-accordion-wrapper">
        <Accordion data={accordionData} />
      </div>
    </div>
  );
}