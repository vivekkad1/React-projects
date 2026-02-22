import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../features/auth/LoginModal";
import logo from "../../assets/logo.png";

const Header = React.memo(() => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLoginOpen = () => setIsLoginModalOpen(true);
  const handleLoginClose = () => setIsLoginModalOpen(false);

  const showSolid = !isHome || scrolled;

  return (
    <header
      className={`text-white py-3 z-70 w-full transition-all duration-300 ${
        isHome ? "fixed top-0 left-0" : "relative"
      } ${showSolid ? "bg-slate-900 shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-300 mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="BharatTrips Logo"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center">
          <button
            onClick={handleLoginOpen}
            className="ml-2 sm:ml-4 bg-blue-600 hover:bg-blue-700 rounded-lg h-8 sm:h-9 px-3 sm:px-5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Login / Sign Up
          </button>
        </nav>
      </div>
      <LoginModal open={isLoginModalOpen} handleClose={handleLoginClose} />
    </header>
  );
});

Header.displayName = "Header";

export default Header;
