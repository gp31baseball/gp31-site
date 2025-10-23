import { useEffect, useState } from "react";
import { Trophy, Star, Zap, Medal } from "lucide-react";
import Papa from "papaparse";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [leaders, setLeaders] = useState({ hr: [], avg: [], sb: [] });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Load GameChanger Widget
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

  // ✅ Parse CSV & build leaderboards
  useEffect(() => {
    fetch("/data/team_stats.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const players = results.data
              .filter((p) => parseInt(p.AB || 0) >= 7)
              .map((p) => ({
                name: p.Player?.trim(),
                ab: parseInt(p.AB || 0),
                hits: parseInt(p.H || 0),
                hr: parseInt(p.HR || 0),
                sb: parseInt(p.SB || 0),
                avg:
                  parseInt(p.AB || 0) > 0
                    ? (parseInt(p.H || 0) / parseInt(p.AB || 0)).toFixed(3)
                    : "0.000",
              }));

            const hrLeaders = [...players]
              .sort((a, b) => b.hr - a.hr)
              .slice(0, 5);
            const avgLeaders = [...players]
              .sort((a, b) => b.avg - a.avg)
              .slice(0, 5);
            const sbLeaders = [...players]
              .sort((a, b) => b.sb - a.sb)
              .slice(0, 5);

            setLeaders({ hr: hrLeaders, avg: avgLeaders, sb: sbLeaders });
          },
        });
      })
      .catch(() => console.error("Error loading team_stats.csv"));
  }, []);

  const coaches = [
    { name: "Gregorio Petit", bio: "...", image: "/gallery/gregorio.jpg" },
    { name: "Javier Betancourt", bio: "...", image: "/gallery/javier.jpg" },
    { name: "Andres Sthormes", bio: "...", image: "/gallery/andres.jpg" },
    { name: "Mario Fernandez", bio: "...", image: "/gallery/mario.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center">
      {/* Header */}
      <header className="text-center mt-8 mb-8">
        <img src="/gp31-logo.png" alt="GP31 Logo" className="mx-auto mb-4 w-[200px]" />
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
          <p className="text-lg text-blue-900 leading-relaxed mb-8">
            Follow our journey as we grow the next generation of competitors
            under the banner of Romans 8:31 — “If God is for us, who can be against us.”
          </p>
        </div>
      </section>

      {/* Main 3-column layout */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 w-full max-w-7xl px-6 pb-16">
        {/* Left Column – Coaches */}
        <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Medal className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold text-[#FFD700]">About Coaches</h2>
          </div>
          {coaches.map((c, i) => (
            <div key={i} className="mb-6 text-center">
              <img src={c.image} alt={c.name} className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-[#D4AF37]" />
              <p className="text-lg font-bold text-[#FFD700]">{c.name}</p>
              <p className="text-gray-200 text-sm leading-relaxed">{c.bio}</p>
            </div>
          ))}
        </div>

        {/* Center – GC Widget */}
        <div className="flex flex-col space-y-6">
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg text-center">
            <img
              src="/gallery/champs.jpg"
              alt="Championship Team"
              className="rounded-lg border-4 border-[#D4AF37] shadow-xl object-cover w-full max-w-[800px] mx-auto"
              onError={(e) => (e.currentTarget.src = '/gp31-logo.png')}
            />
            <p className="text-[#FFD700] italic mt-3 text-sm">
              2025 11U PGBA Gold Cup Classic Champions — Houston, TX
            </p>
          </div>
          <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg min-h-[720px] flex flex-col justify-start">
            <div className="flex items-center mb-4 justify-center">
              <Trophy className="text-[#D4AF37] mr-2" />
              <h2 className="text-2xl font-semibold text-[#FFD700]">Recent Games</h2>
            </div>
            <div
              id="gc-schedule-widget-yduq"
              className="border-2 border-[#D4AF37] rounded-xl p-4 bg-[#0F1E3E] shadow-md w-full h-full"
            ></div>
          </div>
        </div>

        {/* Right – CSV-driven Team Leaders */}
        <div className="space-y-6">
          <StatBox title="Home Runs" statList={leaders.hr} statKey="hr" />
          <StatBox title="Batting Avg" statList={leaders.avg} statKey="avg" />
          <StatBox title="Stolen Bases" statList={leaders.sb} statKey="sb" />
        </div>
      </section>
    </div>
  );
}

function StatBox({ title, statList, statKey }) {
  return (
    <div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-md">
      <div className="flex items-center mb-2">
        <h3 className="text-xl font-semibold text-[#FFD700]">{title}</h3>
      </div>
      {statList.map((p, i) => (
        <p key={i} className="flex justify-between border-b border-gray-700 py-1 text-sm">
          <span>
            {i + 1}. {p.name}
          </span>
          <span className="text-[#FFD700] font-bold">{p[statKey]}</span>
        </p>
      ))}
    </div>
  );
}
