import React, { useState, useRef, useEffect } from "react";
import { reviews as initialReviews } from "./reviewsData";

const MAX_REVIEW_PAGES = 15;
const REVIEW_LOGOS = [
  "/img/forbes.png",
  "/img/telegraph.png",
  "/img/financial.png",
  "/img/vogue.png",
  "/img/dailymail.png"
];

const REVIEW_SOURCES = [
  "Forbes",
  "The Daily Telegraph",
  "Financial Times",
  "Vogue",
  "Daily Mail"
];

function shuffleItems(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export default function LastSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allReviews, setAllReviews] = useState(initialReviews);
  const getReviewsPerPage = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  };
  const [REVIEWS_PER_PAGE, setREVIEWS_PER_PAGE] = useState(getReviewsPerPage());
  const [page, setPageRaw] = useState(0);
  const pageCountRaw = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const pageCount = Math.min(pageCountRaw, MAX_REVIEW_PAGES);
  const targetReviewsCount = REVIEWS_PER_PAGE * MAX_REVIEW_PAGES;
  const pagedReviews = allReviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);
  const [reviewFade, setReviewFade] = useState(true);
  const [pendingPage, setPendingPage] = useState(null);

  const [apiError, setApiError] = useState(null);

  const reviewsSectionRef = useRef(null);
  const isFetchingApiReviews = useRef(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  useEffect(() => {
    if (!reviewsVisible || allReviews.length >= targetReviewsCount || isFetchingApiReviews.current) return;

    isFetchingApiReviews.current = true;
    let isMounted = true;

    const fetchFakeReviews = async () => {
      setApiError(null);
      try {
        const missingReviews = targetReviewsCount - allReviews.length;
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const randomPosts = shuffleItems(data).slice(0, missingReviews);
        const newReviews = randomPosts.map((item, idx) => ({
          quote: item.title,
          logo: REVIEW_LOGOS[idx % REVIEW_LOGOS.length],
          source: REVIEW_SOURCES[idx % REVIEW_SOURCES.length],
        }));

        if (isMounted) {
          setAllReviews(prev => [...prev, ...newReviews]);
        }
      } catch {
        isFetchingApiReviews.current = false;
        if (isMounted) setApiError("Failed to get fake feedback from API");
        return;
      }

      isFetchingApiReviews.current = false;
    };

    fetchFakeReviews();
    return () => { isMounted = false; };
  }, [REVIEWS_PER_PAGE, allReviews.length, reviewsVisible, targetReviewsCount]);

  useEffect(() => {
    const section = reviewsSectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setReviewsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
      }, 200);
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
      <div className="section-spacer-sm section-spacer-full" />
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

      <div className="section-spacer-lg section-spacer-full" />

      <section className="reviews-section" ref={reviewsSectionRef}>
        {apiError && <div className="section-error">{apiError}</div>}
        <div className={`reviews-container${reviewFade ? " fade-in" : " fade-out"}`}>
          {pagedReviews.map((item, idx) => (
            <div className="review" key={idx}>
              <p className="review-quote">“{item.quote}”</p>
              <div className="section-spacer-md section-spacer-full" />
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
          />
        ))}
        {pageCountRaw > 15 && (
          <span className="review-pagination-ellipsis"></span>
        )}
      </div>
      {isModalOpen && (
        <FounderModal onClose={() => setIsModalOpen(false)} />
      )}
      <div className="section-spacer-lg section-spacer-full" />
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