import Image from "next/image";
import { Users } from "lucide-react";

export default function Roster() {
  const roster = [
    { number: 2, name: "Nate Snell", position: "SS / P", photo: "/players/nate-swing.jpg" },
    { number: 7, name: "Ty Allen", position: "C / 3B", photo: "/players/ty-throw.jpg" },
    { number: 4, name: "Mason Cruz", position: "OF / 2B", photo: "/players/mason-hit.jpg" },
    { number: 9, name: "Carter Lee", position: "OF / 1B", photo: "/players/carter-slide.jpg" },
    { number: 15, name: "Brady West", position: "P / 1B", photo: "/players/brady-pitch.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center px-6 pb-16">
      <div className="flex items-center mt-8 mb-6">
        <Users className="text-[#D4AF37] mr-3" size={36} />
        <h1 className="text-4xl font-bold text-[#FFD700]">Team Roster</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {roster.map((player, i) => (
          <div
            key={i}
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-lg overflow-hidden shadow-md hover:shadow-gold-500/40 transition-all duration-300 text-center"
          >
            <div className="w-full h-56 relative">
              <Image
                src={player.photo}
                alt={player.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[#FFD700]">#{player.number}</p>
              <p className="text-xl font-semibold mt-1">{player.name}</p>
              <p className="text-gray-300 italic">{player.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
