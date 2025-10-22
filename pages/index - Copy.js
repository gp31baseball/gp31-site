import { Trophy, Star, Zap, Medal } from "lucide-react";

export default function Home() {
  const leaderboard = {
    homeruns: [
      { name: "Cam", stat: 2 },
      { name: "Hunter", stat: 1 },
      { name: "Juan", stat: 1 },
      
    ],
    avg: [
      { name: "Hunter", stat: ".500" },
      { name: "Juan", stat: ".433" },
      { name: "Bruno", stat: ".424" },
      { name: "Cam", stat: ".406" },
      { name: "Nate", stat: ".393" },
    ],
    steals: [
      { name: "Santi", stat: 24 },
      { name: "Sebas", stat: 23 },
      { name: "Caleb", stat: 17 },
      { name: "Cam", stat: 14 },
      { name: "Alex", stat: 12 },
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
    bio: "Gregorio Petit is a Venezuelan former Major League infielder who made his MLB debut with the Oakland Athletics in 2008 and went on to play for the Astros, Yankees, Angels and Twins. Now the manager of the Midland Rockhounds of the Texas League, he brings big-league experience and a championship mindset to GP31 Baseball.",
    image: "/gallery/gregorio.jpg",
  },
  {
    name: "Javier Betancourt",
    bio: "Javier Betancourt is a Venezuelan former minor-league infielder who signed with the Detroit Tigers as an amateur free agent and developed through their system. Now he shares his deep infield experience and competitive spirit with the GP31 Baseball coaching staff.",
    image: "/gallery/javier.jpg",
  },
  {
    name: "Andres Sthormes",
    bio: "Andres Sthormes is a Venezuelan former minor-league catcher who played in the Detroit Tigers and Miami Marlins organizations. He brings a wealth of experience working behind the plate and developing young hitters, and now contributes his expertise to the GP31 Baseball program.",
    image: "/gallery/andres.jpg",
  },
  {
  name: "Mario Fernandez",
  bio: "Mario Fernandez is a Venezuelan former professional pitcher who spent several seasons in the Tampa Bay Rays organization. Known for his command and feel for the game, he now shares his experience developing young arms and teaching mound presence as part of the GP31 Baseball coaching staff.",
  image: "/gallery/mario.jpg",
},

];


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center">
      {/* Header */}
      <header className="text-center mt-8 mb-8">
        <img
          src="/gp31-logo.png"
          alt="GP31 Logo"
          className="mx-auto mb-4 w-[200px]"
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
  <div key={i} className="mb-6 text-center">
    <img
  src={coach.image}
  alt={coach.name}
  className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-[#D4AF37] object-cover
             transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_#FFD700]"
/>

    <p className="text-lg font-bold text-[#FFD700]">{coach.name}</p>
    <p className="text-gray-200 text-sm leading-relaxed">{coach.bio}</p>
  </div>
))}

        </div>

        {/* Center Column – Championship Image + Recent Scores */}
        <div className="flex flex-col space-y-6">
          {/* Permanent Image */}
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg text-center">
            <img
  src="/gallery/champs.jpg"
  alt="Championship Team"
  className="rounded-lg border-4 border-[#D4AF37] shadow-xl object-cover w-full max-w-[800px] mx-auto
             transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_#FFD700] glow-gold"
  onError={(e) => (e.currentTarget.src = '/gp31-logo.png')}
/>


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
