import biteandbliss from "../assets/biteandbliss.png";

export default function Navbar({ open, setOpen }) {
  const toggle = () => setOpen((s) => !s);
  const close = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white z-30 h-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center shrink-0">
            <img
              src={biteandbliss}
              alt="Bite and Bliss"
              className="h-25 w-auto"
            />
          </div>

          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <a href="#home" className="hover:underline">
              Home
            </a>
            <a href="#book" className="hover:underline">
              Book Table
            </a>
            <a href="#menu" className="hover:underline">
              Menu
            </a>
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#contact" className="hover:underline">
              Contact Us
            </a>
          </div>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={toggle}
              className="p-2 rounded focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ease-in-out ${
                  open ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 scale-100 max-h-screen"
            : "opacity-0 scale-95 max-h-0"
        } overflow-hidden bg-black/95`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 text-center">
          <a href="#home" onClick={close} className="block py-2">
            Home
          </a>
          <a href="#book" onClick={close} className="block py-2">
            Book Table
          </a>
          <a href="#menu" onClick={close} className="block py-2">
            Menu
          </a>
          <a href="#about" onClick={close} className="block py-2">
            About Us
          </a>
          <a href="#contact" onClick={close} className="block py-2">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
