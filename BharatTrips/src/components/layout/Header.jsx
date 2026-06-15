import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "../features/auth/LoginModal";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { name: "Flights", path: "/search" },
  { name: "Hotels", path: "/search" },
  { name: "Trains", path: "/search" },
  { name: "Holidays", path: "/search" },
  { name: "Offers", path: "/offers" },
  { name: "Support", path: "/support" },
  { name: "My Trips", path: "/my-trips" },
];

const Header = React.memo(() => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLoginOpen = () => {
    setMobileMenuOpen(false);
    setIsLoginModalOpen(true);
  };
  const handleLoginClose = () => setIsLoginModalOpen(false);

  const bgColor = "bg-white border-b border-slate-200 shadow-sm";
  const navTextColor = "text-slate-700";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${bgColor} py-2 md:py-3`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="BharatTrips Logo"
              className="h-8 md:h-10 w-auto object-contain transition-all duration-300 hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${navTextColor} font-semibold text-[13px] hover:text-primary-blue transition-colors flex items-center gap-1`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handleLoginOpen}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs transition-all duration-300 bg-gradient-to-r from-[#008cff] to-[#0048b3] text-white hover:opacity-90 cursor-pointer shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <FiUser className="w-3 h-3 text-white" />
              </div>
              Login or Create Account
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-full transition-all hover:bg-slate-100 text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col h-screen overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 pb-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-dark font-medium text-lg border-b border-slate-100 pb-3"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLoginOpen}
                className="mt-6 w-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-primary-blue hover:bg-blue-700 shadow-md transition-all"
              >
                <FiUser className="w-5 h-5" />
                Login / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal open={isLoginModalOpen} handleClose={handleLoginClose} />
    </>
  );
});

Header.displayName = "Header";

export default Header;
