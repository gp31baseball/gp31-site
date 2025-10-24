import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Roster", path: "/roster" },
    { name: "Gallery", path: "/gallery" },
    { name: "Mission", path: "/mission" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-center space-x-8 py-4 border-b border-[#D4AF37] shadow-lg transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A1A3F]/70 backdrop-blur-md"
          : "bg-[#0A1A3F]/100 backdrop-blur-0"
      }`}
    >
      {links.map((link) => {
        const isActive =
          router.pathname === link.path ||
          router.pathname.startsWith(link.path + "/");

        return (
          <Link key={link.path} href={link.path}>
            <span
              className={`cursor-pointer text-sm md:text-base font-semibold transition-all duration-300 glow-gold-nav ${
                isActive
                  ? "text-[#FFD700] border-b-2 border-[#FFD700] pb-1"
                  : "text-[#FFD700] hover:text-[#FFD700] hover:border-b-2 hover:border-[#FFD700] pb-1 border-transparent"
              }`}
            >
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
