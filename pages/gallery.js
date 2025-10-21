import Image from "next/image";
import { Camera } from "lucide-react";

export default function Gallery() {
  const gallery = [
    { src: "/gallery/stock1.jpg", caption: "Postgame Prayer — Romans 8:31" },
    { src: "/gallery/stock2.jpg", caption: "Team Huddle — Unity and Focus" },
    { src: "/gallery/stock3.jpg", caption: "Line Drive — GP31 in Action" },
    { src: "/gallery/stock4.jpg", caption: "Family in the Stands — Faith and Support" },
    { src: "/gallery/stock5.jpg", caption: "Big Win Celebration — Hard Work Pays Off" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center px-6 pb-20">
      <div className="flex items-center mt-8 mb-6">
        <Camera className="text-[#D4AF37] mr-3" size={36} />
        <h1 className="text-4xl font-bold text-[#FFD700]">Photo Gallery</h1>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {gallery.map((photo, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-gold-500/40 transition-all duration-300">
            <Image
              src={photo.src}
              alt={photo.caption}
              width={400}
              height={300}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#0A1A3F]/80 text-[#FFD700] text-sm p-2 text-center font-medium">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden flex overflow-x-scroll space-x-4 snap-x snap-mandatory pb-4 w-full">
        {gallery.map((photo, i) => (
          <div key={i} className="min-w-[80%] relative overflow-hidden rounded-lg snap-center shadow-lg">
            <Image
              src={photo.src}
              alt={photo.caption}
              width={400}
              height={300}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#0A1A3F]/80 text-[#FFD700] text-sm p-2 text-center font-medium">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
