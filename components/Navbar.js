import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#07163B] text-white flex justify-between items-center h-[70px] px-8 border-b border-[#FFD700]/40 shadow-sm">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center h-full">
        <Image
          src="/images/gp31.jpg"
          alt="GP31 Baseball Logo"
          width={90}
          height={55}
          className="object-contain h-[55px] w-auto"
          priority
        />
      </Link>

      {/* Right: Navigation Links */}
      <div className="flex gap-8 items-center text-base font-semibold">
        <Link
          href="/"
          className="glow-gold-nav transition relative after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#FFD700] hover:after:w-full after:transition-all"
        >
          Home
        </Link>
        <Link
          href="/roster"
          className="glow-gold-nav transition relative after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#FFD700] hover:after:w-full after:transition-all"
        >
          Roster
        </Link>
        <Link
          href="/gallery"
          className="glow-gold-nav transition relative after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#FFD700] hover:after:w-full after:transition-all"
        >
          Gallery
        </Link>
        <Link
          href="/mission"
          className="glow-gold-nav transition relative after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#FFD700] hover:after:w-full after:transition-all"
        >
          Mission
        </Link>
        <Link
          href="/contact"
          className="glow-gold-nav transition relative after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-0 after:bg-[#FFD700] hover:after:w-full after:transition-all"
        >
          Contact
        </Link>

        {/* ⚾ Admin Button */}
        <Link
          href="/admin/logs"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-4 py-1.5 rounded-md bg-[#FFD700] text-[#0B0B0C] font-semibold hover:bg-[#FFF580] hover:shadow-[0_0_8px_rgba(255,215,0,0.6)] transition"
        >
          ⚾ Admin
        </Link>
      </div>
    </nav>
  );
}
