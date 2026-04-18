import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header-fixed w-full h-[65px] flex items-center justify-center${scrolled ? " header-blur" : ""}`}>
      <div className="w-[1340px] h-[44px] flex items-center justify-between">
        {/* Left Navigation */}
        <nav className="flex items-center w-[455px] h-full gap-8 mr-8">
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">SUPPLEMENT</a>
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">LASER</a>
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">REVIEWS</a>
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">JOURNAL</a>
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">ABOUT</a>
        </nav>
        {/* Logo Centered */}
        <div className="flex-shrink-0 flex justify-center items-center mx-auto" style={{width: '98px'}}>
          <img src="/img/lyma.png" alt="LYMA Logo" className="w-[98px] h-[13px] object-contain" />
        </div>
        {/* Right Navigation */}
        <div className="flex items-center w-[455px] h-full gap-8 justify-end">
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors whitespace-nowrap">HELP & SUPPORT</a>
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors">ACTIVATE</a>
          <a href="#" className="font-montserrat font-medium text-xs leading-none px-4 tracking-widest text-black/30 hover:text-black focus:text-black active:text-black cursor-pointer transition-colors mr-8 relative after:content-[''] after:absolute after:right-[-16px] after:top-1/2 after:-translate-y-1/2 after:w-px after:h-4 after:bg-gray-300 after:ml-4">ACCOUNT</a>
          <button className="ml-4 h-[23px] w-[64px] px-6 bg-black text-white text-xs font-medium uppercase tracking-widest rounded-none">BUY</button>
        </div>
      </div>
    </header>
  );
};

export default Header;