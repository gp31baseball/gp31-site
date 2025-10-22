import Image from "next/image";
import { Trophy, Star, Zap, Medal } from "lucide-react";

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

  const recentScores = [
    { result: "L, 8–12", opponent: "DrillBit Roughnecks 11U – Weaver" },
    { result: "W, 14–6", opponent: "AP Express Basket 11U" },
    { result: "W, 21–6", opponent: "Texas Seminoles" },
    { result: "W, 7–6", opponent: "AP Express Basket 11U (Semifinals)" },
    { result: "W, 12–4", opponent: "USA Prime BSB White – J. Taylor (Championship)" },
  ];

  const coaches = [
    {
      name: "Gregorio Petit",
      bio: "Currently the manager of the Midland RockHounds. Gregorio played six seasons in Major League Baseball.",
    },
    {
      name: "Javier Betancourt",
      bio: "Signed with the Detroit Tigers and played in their minor league system for multiple seasons.",
    },
    {
      name: "Andres Sthormes",
      bio: "Also signed by the Detroit Tigers and competed within their minor league system.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center">
      {/* Header */}
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

      {/* Main 3-column layout */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 w-full max-w-7xl px-6 pb-16">
        {/* Left Column – About Coaches */}
        <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Medal className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold text-[#FFD700]">
              About Coaches
            </h2>
          </div>
          {coaches.map((coach, i) => (
            <div key={i} className="mb-4">
              <p className="text-lg font-bold text-[#FFD700]">{coach.name}</p>
              <p className="text-gray-200 text-sm leading-relaxed">
                {coach.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Center Column – Championship Image + Recent Scores */}
        <div className="flex flex-col space-y-6">
          {/* Permanent Image */}
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg text-center">
            <div className="relative w-full max-w-[800px] mx-auto">
              <Image
                src="/gallery/champs.jpg"
                alt="Championship Team"
                width={800}
                height={500}
                className="rounded-lg border-4 border-[#D4AF37] shadow-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/gp31-logo.png"; // fallback image
                }}
                priority
              />
            </div>
            <p className="text-[#FFD700] italic mt-3 text-sm">
              2025 11U PGBA Gold Cup Classic Champions — Houston, TX
            </p>
          </div>

          {/* Recent Scores */}
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Trophy className="text-[#D4AF37] mr-2" />
              <h2 className="text-2xl font-semibold text-[#FFD700]">
                Recent Scores
              </h2>
            </div>
            <ul className="space-y-2">
              {recentScores.map((game, i) => {
                const isWin = game.result.startsWith("W");
                return (
                  <li
                    key={i}
                    className={`flex justify-between border-b border-gray-700 pb-1 ${
                      isWin ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <span className="font-semibold">{game.result}</span>
                    <span className="text-gray-300 text-sm ml-2">
                      {game.opponent}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Column – Team Leaders */}
        <div className="space-y-6">
          {/* Home Runs */}
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Trophy className="text-[#D4AF37] mr-2" />
              <h3 className="text-xl font-semibold">Home Runs</h3>
            </div>
            {leaderboard.homeruns.map((p, i) => (
              <p
                key={i}
                className="flex justify-between border-b border-gray-700 py-1 text-sm"
              >
                <span>
                  {i + 1}. {p.name}
                </span>
                <span className="text-[#FFD700] font-bold">{p.stat}</span>
              </p>
            ))}
          </div>

          {/* Batting Avg */}
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Star className="text-[#D4AF37] mr-2" />
              <h3 className="text-xl font-semibold">Batting Avg</h3>
            </div>
            {leaderboard.avg.map((p, i) => (
              <p
                key={i}
                className="flex justify-between border-b border-gray-700 py-1 text-sm"
              >
                <span>
                  {i + 1}. {p.name}
                </span>
                <span className="text-[#FFD700] font-bold">{p.stat}</span>
              </p>
            ))}
          </div>

          {/* Stolen Bases */}
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Zap className="text-[#D4AF37] mr-2" />
              <h3 className="text-xl font-semibold">Stolen Bases</h3>
            </div>
            {leaderboard.steals.map((p, i) => (
              <p
                key={i}
                className="flex justify-between border-b border-gray-700 py-1 text-sm"
              >
                <span>
                  {i + 1}. {p.name}
                </span>
                <span className="text-[#FFD700] font-bold">{p.stat}</span>
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
