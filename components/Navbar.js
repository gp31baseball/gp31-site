import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Roster", path: "/roster" },
    { name: "Gallery", path: "/gallery" },
    { name: "Mission", path: "/mission" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0A1A3F] border-b-2 border-[#D4AF37] py-4 shadow-md flex justify-center gap-8 text-lg font-semibold sticky top-0 z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={`hover:text-[#FFD700] transition transform hover:scale-110 ${
            router.pathname === item.path ? "text-[#FFD700]" : "text-white"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
