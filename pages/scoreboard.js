// pages/scoreboard.js
import { useEffect, useState } from "react";
import LiveGameHud from "../components/LiveGameHud";

export default function ScoreboardPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    fetch("/api/gp31-11u")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...(data.games || [])].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setGames(sorted);
        setLoading(false);
      })
      .catch((err) => console.error("Scoreboard error:", err));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B0B0C] text-gray-100 pb-16">
        <div className="mx-auto max-w-6xl px-4 pt-10">
          <p className="text-center text-gray-400 animate-pulse">
            Loading scoreboard…
          </p>
        </div>
      </main>
    );
  }

  // Split sections cleanly
  const latest = games[0];
  const recent = games.slice(1, 4);
  const archive = games.slice(4);

  return (
    <main className="min-h-screen bg-[#0B0B0C] text-gray-100 pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10">

        {/* HEADER */}
        <header className="mb-10 text-center bg-[#0A1A3F] py-8 rounded-xl shadow-lg border border-gold">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide gold-shine mb-2">
            GP31 Scoreboard
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            Official GP31 results — updated as games are completed.
          </p>
        </header>

        {/* LIVE HUD */}
        {latest && (
          <>
            <LiveGameHud game={latest} />
            <div className="h-[1px] bg-[#1A1A20] my-10" />
          </>
        )}

        {/* RECENT GAMES */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gold mb-4">Recent Games</h2>

          <div className="space-y-4">
            {recent.map((g, i) => (
              <div
                key={i}
                className="
                  bg-[#0F1117] relative p-4 rounded-xl 
                  border border-[#1A1D27]
                  shadow-[0_0_15px_rgba(0,0,0,0.35)]
                  overflow-hidden
                  hover:scale-[1.015] transition-all duration-200
                "
              >
                {/* Left Win/Loss color bar */}
                <div
                  className={`
                    absolute left-0 top-0 h-full w-[6px]
                    ${g.result === "W" ? "bg-green-500" : "bg-red-500"}
                  `}
                />

                <div className="text-lg font-semibold text-gray-100">
                  {g.date}
                </div>
                <div className="text-gray-400">{g.location}</div>

                <div className="text-3xl mt-1 font-bold">
                  <span
                    className={
                      g.result === "W" ? "text-green-400" : "text-red-400"
                    }
                  >
                    {g.result}
                  </span>{" "}
                  {g.gp31Runs}-{g.oppRuns}
                </div>

                <div className="text-gray-200 text-lg">
                  vs <span className="font-semibold">{g.opponent}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

    {/* ARCHIVE (Collapsible) */}
<section className="mt-16 pb-10">
  <button
  onClick={() => setShowArchive(!showArchive)}
  className="
    w-full flex items-center justify-between 
    bg-[#0F1117]
    px-4 py-3 
    rounded-xl 
    border border-[#1A1D27] 
    shadow-[0_0_12px_rgba(0,0,0,0.25)]
    text-xl font-bold text-gold 
    hover:bg-[#12141B] 
    transition
  "
>
  <span>Game Archive</span>
  <span className="text-gold text-xl">
    {showArchive ? "▲" : "▼"}
  </span>
</button>


  {/* Smooth expand/collapse */}
  <div
    className={`transition-all duration-300 overflow-hidden ${
      showArchive ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div className="space-y-3 mt-4">
      {archive.map((g, i) => (
        <div
          key={i}
          className="
            bg-[#0C0C10] p-3 rounded-lg 
            border border-[#1A1A25] shadow-sm
          "
        >
          <div className="text-xs text-gray-400 mb-[2px]">{g.date}</div>

          <div className="text-gray-200">
            <span
              className={
                g.result === "W" ? "text-green-400" : "text-red-400"
              }
            >
              {g.result}
            </span>{" "}
            {g.gp31Runs}-{g.oppRuns} — vs{" "}
            <span className="font-semibold">{g.opponent}</span>
          </div>

          <div className="text-[11px] text-gray-500">{g.location}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      </div>

      {/* Extra style for title glow */}
      <style>{`
        .gold-shine {
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.35),
                       0 0 20px rgba(255, 215, 0, 0.25);
        }
      `}</style>
    </main>
  );
}
