import { useEffect, useState } from "react";
import { Trophy, Star, Zap, Medal, Crown } from "lucide-react";
import Papa from "papaparse";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [leaders, setLeaders] = useState({ hr: [], avg: [], sb: [] });
  const [lastUpdated, setLastUpdated] = useState("");

  // Fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Load GameChanger widget
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.gc.com/static/js/sdk.v1.js";
    script.async = true;
    script.onload = () => {
      if (window.GC?.team?.schedule?.init) {
        window.GC.team.schedule.init({
          target: "#gc-schedule-widget-yduq",
          widgetId: "d5747b9c-b13f-4cd2-b6b5-d00860d7ca4a",
          maxVerticalGamesVisible: 10,
        });
        setTimeout(() => {
          const el = document.getElementById("gc-schedule-widget-yduq");
          if (el) el.scrollTop = el.scrollHeight;
        }, 2500);
      }
    };
    document.body.appendChild(script);
  }, []);

  // ✅ CSV Parser for Team Leaders
  useEffect(() => {
    fetch("/data/team_stats.csv")
      .then((res) => res.text())
      .then((csvText) => {
        setLastUpdated(new Date().toLocaleString());

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          delimiter: "",
          transformHeader: (h) => h.trim().toLowerCase(),
          beforeFirstChunk: (chunk) => {
            const lines = chunk.split(/\r\n|\n/);
            const headerIndex = lines.findIndex((line) =>
              line.startsWith("Number,Last,First")
            );
            if (headerIndex !== -1) return lines.slice(headerIndex).join("\n");
            return chunk;
          },

          complete: (results) => {
            const rawPlayers = results.data
              // ✅ Remove blank or partial names
              .filter((p) => (p.first?.trim() || "") && (p.last?.trim() || ""))
              .map((p) => {
                const ab = parseInt(p.ab || 0);
                const hits = parseInt(p.h || 0);
                const hr = parseInt(p.hr || 0);

                // ✅ Use the first "sb" column — the real offensive steals
let sb = 0;
if (p.sb !== undefined) {
  const sbRaw = (p.sb || "").toString().trim();
  sb = Number(sbRaw.replace(/[^0-9.]/g, "")) || 0;
} else if (p["sb_1"] !== undefined) {
  // fallback just in case PapaParse shifted column order
  const sbRaw = (p["sb_1"] || "").toString().trim();
  sb = Number(sbRaw.replace(/[^0-9.]/g, "")) || 0;
}

                // ✅ Compute batting average
                const rawAvg =
                  p.avg && !isNaN(parseFloat(p.avg))
                    ? parseFloat(p.avg)
                    : ab > 0
                    ? hits / ab
                    : 0;

                // ✅ Format AVG like ".571" (no leading 0)
                let formattedAvg = ".000";
                if (rawAvg > 0) {
                  const digits = rawAvg.toFixed(3).split(".")[1];
                  formattedAvg = `.${digits}`;
                }

                return {
                  name: `${p.first.trim()} ${p.last.trim()}`,
                  ab,
                  hits,
                  hr,
                  sb,
                  avg: parseFloat(rawAvg.toFixed(3)),
                  displayAvg: formattedAvg,
                };
              });

            // ✅ Separate filters for leaderboards
            const batters = rawPlayers.filter((p) => p.ab > 10);
            const runners = rawPlayers.filter((p) => p.sb > 0);

            const hrLeaders = [...batters]
              .filter((p) => p.hr > 0)
              .sort((a, b) => b.hr - a.hr)
              .slice(0, 5);

            const avgLeaders = [...batters]
              .sort((a, b) => parseFloat(b.avg) - parseFloat(a.avg))
              .slice(0, 5);

            // ✅ Stolen Bases Leaders (ensure numeric sort)
const sbLeaders = [...runners]
  .filter((p) => !isNaN(p.sb) && p.sb > 0)
  .sort((a, b) => Number(b.sb) - Number(a.sb))
  .slice(0, 5);


            setLeaders({ hr: hrLeaders, avg: avgLeaders, sb: sbLeaders });
          },
        });
      })
      .catch((err) =>
        console.error("Error loading or parsing team_stats.csv:", err)
      );
  }, []);

  const coaches = [
    {
      name: "Gregorio Petit",
      bio: "Former MLB infielder (A’s, Astros, Yankees, Angels, Twins). Now manager of the Midland Rockhounds, bringing big-league experience and a championship mindset.",
      image: "/gallery/gregorio.jpg",
    },
    {
      name: "Javier Betancourt",
      bio: "Venezuelan former minor-league infielder (Detroit Tigers). Adds deep infield knowledge and competitive spirit to the GP31 coaching staff.",
      image: "/gallery/javier.jpg",
    },
    {
      name: "Andres Sthormes",
      bio: "Former catcher (Detroit Tigers, Miami Marlins). Expert at developing hitters and managing pitchers, key to GP31’s offensive approach.",
      image: "/gallery/andres.jpg",
    },
    {
      name: "Mario Fernandez",
      bio: "Former pitcher (Tampa Bay Rays). Specializes in developing young arms, teaching mound presence, and controlling tempo under pressure.",
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
        className={`bg-white text-center py-12 px-4 md:px-12 w-full mb-10 transition-all duration-1000 ease-out transform ${
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
            Welcome to <strong>GP31Baseball.com</strong> — the home for{" "}
            <strong>GP31 Baseball</strong>, a team built on faith, discipline,
            and a drive to compete at the highest level.
          </p>
          <p className="text-lg text-blue-900 leading-relaxed mb-8">
            Follow our journey as we grow the next generation of competitors
            under the banner of Romans 8:31 — “If God is for us, who can be
            against us.”
          </p>
          <a
            href="/about"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-2xl shadow-md transition-transform transform hover:scale-105"
          >
            Learn More About GP31
          </a>
        </div>
      </section>

      {/* Main Layout */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 w-full max-w-7xl px-6 pb-16">
        {/* Left – Coaches */}
        <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg animate-fadeIn">
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
                className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-[#D4AF37] object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_#FFD700]"
              />
              <p className="text-lg font-bold text-[#FFD700]">{coach.name}</p>
              <p className="text-gray-200 text-sm leading-relaxed">
                {coach.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Center – GameChanger Widget */}
        <div className="flex flex-col space-y-6 animate-fadeIn">
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg text-center">
            <img
              src="/gallery/champs.jpg"
              alt="Championship Team"
              className="rounded-lg border-4 border-[#D4AF37] shadow-xl object-cover w-full max-w-[800px] mx-auto transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_#FFD700]"
              onError={(e) => (e.currentTarget.src = "/gp31-logo.png")}
            />
            <p className="text-[#FFD700] italic mt-3 text-sm">
              2025 11U PGBA Gold Cup Classic Champions — Houston, TX
            </p>
          </div>

          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg min-h-[720px] flex flex-col justify-start">
            <div className="flex items-center mb-4 justify-center">
              <Trophy className="text-[#D4AF37] mr-2" />
              <h2 className="text-2xl font-semibold text-[#FFD700]">
                Recent Games
              </h2>
            </div>
            <div
              id="gc-schedule-widget-yduq"
              className="border-2 border-[#D4AF37] rounded-xl p-4 bg-[#0F1E3E] shadow-md w-full h-full"
            ></div>
          </div>
        </div>

        {/* Right – CSV Team Leaders */}
        <div className="space-y-6 animate-fadeIn">
          <StatBox
            title="Home Runs"
            statList={leaders.hr}
            statKey="hr"
            icon={<Crown />}
          />
          <StatBox
            title="Batting Avg"
            statList={leaders.avg}
            statKey="avg"
            icon={<Star />}
          />
          <StatBox
            title="Stolen Bases"
            statList={leaders.sb}
            statKey="sb"
            icon={<Zap />}
          />
          <p className="text-gray-400 italic text-xs text-center mt-3">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}

function StatBox({ title, statList, statKey, icon }) {
  const showMinABNote = title === "Batting Avg";

  return (
    <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg hover:shadow-[0_0_15px_#FFD700] transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center mb-2">
        {icon && <div className="text-[#FFD700] mr-2">{icon}</div>}
        <h3 className="text-xl font-semibold text-[#FFD700]">{title}</h3>
      </div>

      {showMinABNote && (
        <p className="text-[#FFD700] italic text-xs mb-2">
          *Min 10 AB to qualify
        </p>
      )}

      {statList.length > 0 ? (
        statList.map((p, i) => (
          <p
            key={i}
            className={`flex justify-between border-b border-gray-700 py-1 text-sm ${
              i === 0 ? "bg-[#FFD700]/10 rounded-lg font-bold" : ""
            }`}
          >
            <span>
              {i + 1}. {p.name}
            </span>
            <span
              className={`${
                i === 0 ? "text-[#FFD700]" : "text-gray-200"
              } font-semibold`}
            >
              {statKey === "avg" ? p.displayAvg : p[statKey]}
            </span>
          </p>
        ))
      ) : (
        <p className="text-gray-400 italic text-sm">Not enough data yet.</p>
      )}
    </div>
  );
}
