import Image from "next/image";
import { Trophy, Star, Zap } from "lucide-react";

export default function Home() {
  const leaderboard = {
    homeruns: [
      { name: "Nate Snell", stat: 7 },
      { name: "Ty Allen", stat: 5 },
      { name: "Mason Cruz", stat: 4 },
      { name: "Carter Lee", stat: 3 },
      { name: "Brady West", stat: 2 },
    ],
    avg: [
      { name: "Nate Snell", stat: ".512" },
      { name: "Ty Allen", stat: ".468" },
      { name: "Mason Cruz", stat: ".441" },
      { name: "Carter Lee", stat: ".427" },
      { name: "Brady West", stat: ".398" },
    ],
    steals: [
      { name: "Nate Snell", stat: 14 },
      { name: "Carter Lee", stat: 11 },
      { name: "Ty Allen", stat: 10 },
      { name: "Mason Cruz", stat: 9 },
      { name: "Brady West", stat: 7 },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white">
      {/* Hero Section */}
      <header className="text-center mt-8 mb-8">
        <Image
          src="/gp31-logo.png"
          alt="GP31 Logo"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <h1 className="text-5xl font-bold text-[#D4AF37] drop-shadow-lg">
          GP31 Baseball 11U
        </h1>
        <p className="text-xl italic text-gray-200 mt-2 animate-pulse">
          “If God is for us, who can be against us” — Romans 8:31
        </p>
      </header>

      {/* Leaderboards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 pb-12">
        {/* Home Runs */}
        <div className="bg-[#10224F] border-2 border-[#D4AF37] p-4 shadow-xl rounded-xl">
          <div className="flex items-center mb-3">
            <Trophy className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold">Home Runs</h2>
          </div>
          {leaderboard.homeruns.map((p, i) => (
            <p
              key={i}
              className="text-lg flex justify-between border-b border-gray-600 py-1"
            >
              <span>
                {i + 1}. {p.name}
              </span>
              <span className="text-[#FFD700] font-bold">{p.stat}</span>
            </p>
          ))}
        </div>

        {/* Batting Avg */}
        <div className="bg-[#10224F] border-2 border-[#D4AF37] p-4 shadow-xl rounded-xl">
          <div className="flex items-center mb-3">
            <Star className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold">Batting Avg</h2>
          </div>
          {leaderboard.avg.map((p, i) => (
            <p
              key={i}
              className="text-lg flex justify-between border-b border-gray-600 py-1"
            >
              <span>
                {i + 1}. {p.name}
              </span>
              <span className="text-[#FFD700] font-bold">{p.stat}</span>
            </p>
          ))}
        </div>

        {/* Stolen Bases */}
        <div className="bg-[#10224F] border-2 border-[#D4AF37] p-4 shadow-xl rounded-xl">
          <div className="flex items-center mb-3">
            <Zap className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold">Stolen Bases</h2>
          </div>
          {leaderboard.steals.map((p, i) => (
            <p
              key={i}
              className="text-lg flex justify-between border-b border-gray-600 py-1"
            >
              <span>
                {i + 1}. {p.name}
              </span>
              <span className="text-[#FFD700] font-bold">{p.stat}</span>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
