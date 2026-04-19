import React, { useEffect, useState } from "react";

export default function FourSection() {
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
  }, [bgIndex]);

  return (
    <section
      className="w-full min-w-[1440px] h-[800px] flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{}}
    >
      {backgrounds.map((bg, i) => (
        <div
          key={bg}
          className={
            "hero-bg-fade absolute inset-0 w-full h-full bg-cover bg-center" +
            (i === bgIndex && fade ? " show" : "") +
            (i === bgIndex && !fade ? " hide" : "")
          }
          style={{ backgroundImage: `url('${bg}')`, zIndex: 1 }}
        />
      ))}
      <div className={
        "relative z-10 flex flex-col items-center justify-center h-full hero-fade" +
        (show ? " show" : "")
      }>
        <h1
          className="text-white font-roboto font-normal text-[57px] leading-none tracking-[0.8px] text-center drop-shadow-lg mb-6 uppercase"
          style={{ width: '756px', height: '67px', letterSpacing: '0.8px' }}
        >
          WELLNESS INNOVATION AT ITS SCIENTIFIC BEST.
        </h1>
        <div style={{ paddingBottom: 30 }} />
        <div className="flex flex-wrap mt-10 justify-center" style={{ gap: '35px' }}>
          <button className="hero-btn">SUPPLEMENT</button>
          <button className="hero-btn">LASER</button>
        </div>
      </div>
    </section>
  );
}