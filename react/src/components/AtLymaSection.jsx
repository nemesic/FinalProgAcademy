import React, { useEffect, useRef, useState } from "react";


export default function AtLymaSection() {
  const [show, setShow] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: 20 }} />
      <section
        ref={sectionRef}
        className="atlyma-section w-full min-w-[1440px] h-[600px] flex flex-col items-center justify-center relative"
      >
        <div className={"atlyma-content atlyma-fade" + (show ? " show" : "")}>
          <h2 className="atlyma-title">THE QUEST FOR BETTER.</h2>
          <img src="/img/atLyma.png" alt="" className="atlyma-img" />
          <p className="atlyma-desc">
            At LYMA, we’re always searching for the perfect balance of science, nature and technology. Every LYMA product has been designed to work together. We know that when we discover the best, you’ll discover yours.
          </p>
        </div>
      </section>
      <div style={{ height: 20 }} />
    </>
  );
}