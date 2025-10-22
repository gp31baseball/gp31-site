import Link from "next/link";
import Image from "next/image";

export default function GalleryIndex() {
  const galleries = [
  {
    name: "PGBA Gold Cup Classic",
    description: "Houston, TX – 2025 Champions",
    link: "/gallery/goldcup",
    image: "/gallery/goldcup1.jpg",
  },
  {
    name: "Team Photos",
    description: "Proudly representing GP31 Baseball",
    link: "/gallery/team",
    image: "/gallery/team1.jpg",
  },
  {
    name: "Fun & Memories",
    description: "Because GP31 is more than baseball.",
    link: "/gallery/fun",
    image: "/gallery/fun1.jpg",
  },
];


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center px-6 pb-20">
      {/* Header */}
      <header className="text-center mt-8 mb-10">
        <h1 className="text-5xl font-bold text-[#D4AF37] drop-shadow-lg">
          GP31 Baseball Gallery
        </h1>
        <p className="text-gray-300 italic mt-2">
          “Tournaments, teamwork, and memories worth sharing.”
        </p>
      </header>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {galleries.map((gallery, i) => (
          <Link href={gallery.link} key={i}>
            <div className="cursor-pointer bg-[#10224F] border-2 border-[#D4AF37] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_#FFD700] group glow-card">

              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={gallery.image}
                  alt={gallery.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h2 className="text-2xl font-bold text-[#FFD700]">
                    {gallery.name}
                  </h2>
                  <p className="text-gray-300 text-sm italic">
                    {gallery.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
