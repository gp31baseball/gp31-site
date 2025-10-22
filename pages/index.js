import { useEffect, useState } from "react";
import { Trophy, Star, Zap, Medal } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

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

      {/* Launch Section */}
      <section
        className={`bg-white text-center py-12 px-4 md:px-12 w-full transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-400 bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]"
            style={{ WebkitBackgroundClip: "text" }}
          >
            🏆 GP31 Baseball Official Site Launch
          </h2>

          <p className="text-lg text-blue-900 leading-relaxed mb-6">
            We’re proud to announce the official launch of{" "}
            <strong>GP31Baseball.com</strong>, the new home for{" "}
            <strong>GP31 Baseball</strong> — a team built on faith, discipline,
            and a drive to compete at the highest level.
          </p>
          <p className="text-lg text-blue-900 leading-relaxed mb-6">
            Our mission is simple: to develop young athletes through hard work,
            integrity, and teamwork, both on and off the field. The site
            features updates on our latest tournaments, rosters, stats, and
            player highlights — with much more to come as the 2025 season
            unfolds.
          </p>
          <p className="text-lg text-blue-900 leading-relaxed mb-8">
            Follow our journey as we grow the next generation of competitors
            under the banner of{" "}
            <strong>
              Romans 8:31 — “If God is for us, who can be against us.”
            </strong>
          </p>
          <a
            href="/about"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            Learn More About GP31
          </a>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 200% center;
            }
          }
        `}</style>
      </section>

      {/* Main 3-column layout */}
      {/* (your existing section code remains unchanged below) */}
      {/* ... */}
    </div>
  );
}
