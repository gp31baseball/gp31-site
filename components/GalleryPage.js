import Image from "next/image";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export default function GalleryPage({ title, subtitle, photos }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center px-6 pb-20">
      <header className="text-center mt-8 mb-10">
        <h1 className="text-5xl font-bold text-[#D4AF37] drop-shadow-lg">
          {title}
        </h1>
        {subtitle && <p className="text-gray-300 italic mt-2">{subtitle}</p>}
      </header>

      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border-2 border-[#D4AF37] shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_#FFD700] group cursor-pointer"
            onClick={() => {
              setOpen(true);
              setIndex(i);
            }}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={400}
              height={300}
              className="object-cover w-full h-64 transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#0A1A3F]/80 text-[#FFD700] text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={photos.map((p) => ({
            src: p.src,
            description: p.caption,
          }))}
        />
      )}
    </div>
  );
}
