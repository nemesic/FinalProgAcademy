import React from "react";

const HeroSection = () => {
  return (
    <section
      className="w-full min-w-[1440px] h-[800px] flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/background.png')" }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1
          className="text-white font-roboto font-normal text-[57px] leading-none tracking-[0.8px] text-center drop-shadow-lg mb-6"
          style={{ width: '756px', height: '67px' }}
        >
          THE FUTURE OF WELLNESS.
        </h1>
          <p
            className="text-white font-montserrat font-normal text-[18px] leading-[30px] tracking-[0.44px] text-center drop-shadow pb-[50px]"
            style={{ width: '496px', height: '50px' }}
          >
            The perfect balance of science, nature and technology. Prepare to look and feel your absolute best.
          </p>
        {/* Можна додати кнопки або інший контент */}
              <div className="flex flex-wrap gap-6 mt-10 justify-center">
                <button
                  className="min-w-[160px] px-8 py-2 h-[44px] border-2 border-white text-white font-montserrat font-medium text-base leading-5 tracking-widest text-center bg-transparent hover:bg-white/20 hover:text-black transition-all duration-200 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  SUPPLEMENT
                </button>
                <button
                  className="min-w-[160px] px-8 py-2 h-[44px] border-2 border-white text-white font-montserrat font-medium text-base leading-5 tracking-widest text-center bg-transparent hover:bg-white/20 hover:text-black transition-all duration-200 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  LASER
                </button>
              </div>
      </div>
    </section>
  );
};


export default HeroSection;
