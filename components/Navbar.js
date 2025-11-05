import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav className="w-full bg-[#07163B] text-white flex flex-wrap justify-between items-center px-6 py-2 border-b border-[#FFD700]/40 shadow-sm relative z-50">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center h-[60px]">
        <Image
          src="/images/gp31.jpg"
          alt="GP31 Baseball Logo"
          width={80}
          height={50}
          className="object-contain"
          priority
        />
      </Link>

      {/* Hamburger button (mobile only) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        className="md:hidden text-[#FFD700] focus:outline-none transition-transform duration-200"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Backdrop (visible when menu open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Nav Links */}
      <div
        className={`${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        } md:max-h-none overflow-hidden transition-[max-height] duration-500 ease-in-out w-full md:w-auto md:flex md:items-center text-sm md:text-base font-semibold bg-[#07163B] md:bg-transparent absolute md:static top-[70px] left-0 md:top-auto z-50`}
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-0">
          <Link
            href="/"
            className="glow-gold-nav hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/roster"
            className="glow-gold-nav hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            Roster
          </Link>
          <Link
            href="/gallery"
            className="glow-gold-nav hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="/mission"
            className="glow-gold-nav hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            Mission
          </Link>
          <Link
            href="/contact"
            className="glow-gold-nav hover:text-[#FFD700] transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {/* ⚾ Admin Button */}
          <Link
            href="/admin/logs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-md bg-[#FFD700] text-[#0B0B0C] font-semibold hover:bg-[#FFF580] hover:shadow-[0_0_8px_rgba(255,215,0,0.6)] transition"
            onClick={() => setMenuOpen(false)}
          >
            ⚾ Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
