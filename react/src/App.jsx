import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FacePage from "./components/FacePage";
import AtLymaSection from "./components/AtLymaSection";
import FourSection from "./components/FourSection";
import LastSection from "./components/LastSection";
import Footer from "./components/Footer";
import Supplement from "./pages/Supplement";
import Laser from "./pages/Laser";
import Journal from "./pages/Journal";
import About from "./pages/About";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);
  return null;
}


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FacePage />
              <AtLymaSection />
              <FourSection />
              <LastSection />
              <Footer />
            </>
          }
        />
        <Route path="/supplement" element={<Supplement />} />
        <Route path="/laser" element={<Laser />} />
        <Route path="/last-section" element={<LastSection />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;