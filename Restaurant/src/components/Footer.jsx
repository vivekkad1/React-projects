import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-4 items-center">
          <li>
            <a href="#" aria-label="Instagram" className="flex items-center">
              <InstagramIcon />
              <span className="hidden md:inline ml-2 text-lg">Instagram</span>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Twitter" className="flex items-center">
              <XIcon />
              <span className="hidden md:inline ml-2 text-lg">Twitter</span>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Facebook" className="flex items-center">
              <FacebookIcon />
              <span className="hidden md:inline ml-2 text-lg">Facebook</span>
            </a>
          </li>
        </ul>

        <p className="text-sm md:text-lg">© 2025 BITE AND BLISS</p>
      </div>
    </footer>
  );
}
