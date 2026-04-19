import React, { useState, useRef, useEffect } from "react";
import { reviews } from "./reviewsData";

export default function LastSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getReviewsPerPage = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  };
  const [REVIEWS_PER_PAGE, setREVIEWS_PER_PAGE] = useState(getReviewsPerPage());
  const [page, setPageRaw] = useState(0);
  const pageCount = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const pagedReviews = reviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);
  const [reviewFade, setReviewFade] = useState(true);
  const [pendingPage, setPendingPage] = useState(null);

  const setPage = (newPage) => {
    setReviewFade(false);
    setPendingPage(newPage);
  };

  useEffect(() => {
    if (!reviewFade && pendingPage !== null) {
      const timer = setTimeout(() => {
        setPageRaw(pendingPage);
        setReviewFade(true);
        setPendingPage(null);
      }, 200); // длительность fade-out
      return () => clearTimeout(timer);
    }
  }, [reviewFade, pendingPage]);

  const founderRef = useRef(null);
  const [founderVisible, setFounderVisible] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setFounderVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (founderRef.current) observer.observe(founderRef.current);
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setPage((page + 1) % pageCount);
    }, 3000);
    return () => clearTimeout(timer);
  }, [page, pageCount]);

  useEffect(() => {
    const handleResize = () => {
      if (reviewFade && pendingPage === null) {
        setREVIEWS_PER_PAGE(getReviewsPerPage());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [reviewFade, pendingPage]);


  const handlePageClick = (i) => {
    if (i !== page) setPage(i);
  };

  return (
    <>
      <div style={{ height: "20px", width: "100%" }} />
      <section id="last-section" className={`last-section${founderVisible ? " animated" : ""}`} ref={founderRef}>
        <div className={`last-section-content${founderVisible ? " animated" : ""}`}>
          <h2 className="last-section-title">Meet our founder.</h2>
          <p className="last-section-desc">
            Lucy’s story is one you really need to read; it changed an industry forever.
          </p>
          <button 
            className="last-section-btn"
            onClick={() => setIsModalOpen(true)}
          >
            READ MORE
          </button>
        </div>
      </section>

      <div style={{ height: "100px", width: "100%" }} />

      <section className="reviews-section">
        <div className={`reviews-container${reviewFade ? " fade-in" : " fade-out"}`}>
          {pagedReviews.map((item, idx) => (
            <div className="review" key={idx}>
              <p className="review-quote">“{item.quote}”</p>
              <div style={{ height: "30px", width: "100%" }} />
              {item.logo && (
                <div className="review-logo">
                  <img src={item.logo} alt={item.source} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <div className="review-pagination">
        {Array.from({ length: pageCount }).map((_, i) => (
          <span
            key={i}
            className={`review-dot${i === page ? " active" : ""}`}
            onClick={() => handlePageClick(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      {isModalOpen && (
        <FounderModal onClose={() => setIsModalOpen(false)} />
      )}
      <div style={{ height: "100px", width: "100%" }} />
    </>
  );
}


function FounderModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>Lucy Goff — Founder of LYMA</h2>

        <div className="modal-text">
          <p>
            In 2012, after giving birth to her daughter, Lucy Goff was struck by a life-threatening case of septicaemia (sepsis). 
            She spent six weeks in intensive care fighting for her life. Although she survived, she came out physically devastated — 
            her energy, immune system, and overall health were in ruins.
          </p>

          <p>
            Determined to reclaim her health, Lucy spent years deeply researching the most effective, science-backed ingredients 
            in collaboration with leading doctors and scientists. She discovered powerful compounds that were clinically proven 
            but largely inaccessible to the public.
          </p>

          <p>
            In 2018, driven by her personal transformation and a mission to help others, Lucy left her successful career in 
            journalism and PR to found <strong>LYMA</strong> — a revolutionary wellness brand focused on real results, not marketing hype.
          </p>

          <p>
            What began as one groundbreaking daily supplement has since expanded into a complete ecosystem: the award-winning 
            LYMA Supplement, the world’s most advanced at-home cold laser (LYMA Laser), and a high-performance skincare range.
          </p>

          <p>
            Today, Lucy’s story continues to inspire thousands of people who want to look better, feel better, and age more powerfully. 
            Her journey from the brink of death to building one of the most respected names in wellness is the heart of the LYMA philosophy: 
            <strong>Science first. Results that matter.</strong>
          </p>
        </div>

        <div className="modal-footer">
          <a 
            href="https://lyma.life" 
            target="_blank" 
            rel="noopener noreferrer"
            className="modal-link"
          >
            Learn more about LYMA →
          </a>
        </div>
      </div>
    </div>
  );
}