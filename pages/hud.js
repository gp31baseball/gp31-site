// pages/hud.js
import { useEffect, useState } from "react";
import LiveGameHud from "../components/LiveGameHud";

const TEAMS = [
  { key: "11u", label: "11U" },
  { key: "12u-gold", label: "12U Gold" },
  { key: "12u-navy", label: "12U Navy" },
  { key: "13u", label: "13U" },
  { key: "14u", label: "14U" },
  { key: "15u", label: "15U" },
];

export default function HudPage() {
  const [selectedTeam, setSelectedTeam] = useState("11u");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGames = async (teamKey) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gp31-${teamKey}`);
      const data = await res.json();
      setGames(data.games || []);
    } catch (err) {
      console.error("Error loading HUD games:", err);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames(selectedTeam);
  }, [selectedTeam]);

  const currentTeam = TEAMS.find((t) => t.key === selectedTeam);

  return (
    <main className="min-h-screen bg-[#0A0F23] text-white pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-10">

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gold-shine mb-3 tracking-wide">
            GP31 HUD
          </h1>
          <p className="text-sm md:text-base text-gray-300">
            Latest game for each team. Choose a team to highlight.
          </p>
        </header>

        {/* Team Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TEAMS.map((team) => (
            <button
              key={team.key}
              onClick={() => setSelectedTeam(team.key)}
              className={`px-4 py-2 text-sm md:text-base rounded-full border ${
                team.key === selectedTeam
                  ? "bg-gold text-black border-gold"
                  : "bg-transparent border-gray-600 text-gray-300 hover:border-gold hover:text-gold"
              } transition`}
            >
              {team.label}
            </button>
          ))}
        </div>

        {/* Status text */}
        <div className="text-center text-xs md:text-sm text-gray-400 mb-4">
          Viewing HUD for{" "}
          <span className="text-gold font-semibold">
            {currentTeam?.label}
          </span>
        </div>

        {/* HUD Content */}
        {loading ? (
          <div className="text-center text-gray-400 py-10">
            Loading latest game…
          </div>
        ) : games.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No games recorded yet for {currentTeam?.label}.
          </div>
        ) : (
          <LiveGameHud games={games} />
        )}
      </div>
    </main>
  );
}
