import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const SOCIAL_LINKS = [
  { label: "Instagram", Icon: InstagramIcon, href: "https://instagram.com" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://linkedin.com" },
  { label: "Facebook", Icon: FacebookIcon, href: "https://facebook.com" },
];

const Footer = React.memo(() => (
  <footer className="bg-black text-white py-12 border-t border-white/10">
    <div className="max-w-300 mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-8">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-white hover:text-blue-400 transition-colors"
          >
            <link.Icon style={{ fontSize: 36 }} />
          </a>
        ))}
      </div>

      <div className="text-white text-md font-semibold tracking-tight">
        © 2026 BharatTrips PVT. LTD.
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

export default Footer;
