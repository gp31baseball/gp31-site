import Image from "next/image";

export default function Roster() {
  const roster = [
    { number: 27, name: "Santi", position: "INF / OF", batsThrows: "R/R", image: "/gallery/santi.jpg" },
    { number: 31, name: "Sebas", position: "P / INF", batsThrows: "R/R", image: "/gallery/sebas.jpg" },
    { number: 48, name: "Caleb", position: "P / OF", batsThrows: "R/R", image: "/gallery/caleb.jpg" },
    { number: 23, name: "Cam", position: "OF / P", batsThrows: "L/R", image: "/gallery/cam.jpg" },
    { number: 17, name: "Alex", position: "INF / OF", batsThrows: "R/R", image: "/gallery/alex.jpg" },
    { number: 7, name: "Cesar", position: "INF / OF", batsThrows: "R/R", image: "/gallery/cesar.jpg" },
    { number: 21, name: "Lucas", position: "P / C", batsThrows: "R/R", image: "/gallery/lucas.jpg" },
    { number: 88, name: "Hunter", position: "P / 1B", batsThrows: "R/R", image: "/gallery/hunter.jpg" },
    { number: 2, name: "Nate", position: "SS / P", batsThrows: "R/R", image: "/gallery/nate.jpg" },
    { number: 3, name: "Luis", position: "INF / OF", batsThrows: "R/R", image: "/gallery/luis.jpg" },
    { number: 99, name: "Bruno", position: "OF / 1B", batsThrows: "L/R", image: "/gallery/bruno.jpg" },
    { number: 8, name: "Ryland", position: "OF / INF", batsThrows: "R/R", image: "/gallery/ryland.jpg" },
    { number: 32, name: "Matt", position: "P / C", batsThrows: "R/R", image: "/gallery/matt.jpg" },
    { number: 24, name: "Juan", position: "INF / OF", batsThrows: "R/R", image: "/gallery/juan.jpg" },
    { number: 1, name: "Josiah", position: "C / P", batsThrows: "R/R", image: "/gallery/josiah.jpg" },
    { number: 0, name: "Chulo", position: "INF / OF", batsThrows: "R/R", image: "/gallery/chulo.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center px-6 pb-20">
      {/* Header */}
      <header className="text-center mt-8 mb-10">
        <h1 className="text-5xl font-bold text-[#D4AF37] drop-shadow-lg">
          GP31 Baseball 11U Roster
        </h1>
        <p className="text-gray-300 italic mt-2">
          “Play hard, play smart, play for each other.”
        </p>
      </header>

      {/* Player Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {roster.map((player, i) => (
          <div
            key={i}
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_#FFD700]"
          >
            {/* Player Image Wrapper */}
            <div className="relative w-36 h-36 mx-auto mb-4 rounded-full border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center bg-[#0A1A3F] group card-glow">
              <Image
                src={player.image || "/gp31-logo.png"}
                alt={player.name}
                width={300}
                height={300}
                className="object-cover object-top w-full h-full rounded-full transition-transform duration-300 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-2">
                <p className="text-[#0A1A3F] font-extrabold text-lg drop-shadow-md">
                  #{player.number}
                </p>
                <p className="text-[#0A1A3F] font-semibold text-sm">{player.name}</p>
              </div>
            </div>

            {/* Player Info */}
            <h2 className="text-[#FFD700] font-bold text-xl">
              #{player.number} {player.name}
            </h2>
            <p className="text-gray-200 text-sm">{player.position}</p>
            <p className="text-gray-400 text-xs italic">B/T: {player.batsThrows}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
