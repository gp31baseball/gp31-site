// components/LiveGameHud.js

function pickFeaturedGame(games) {
  if (!games || games.length === 0) return null;

  // Prefer any LIVE games
  const live = games.filter((g) => g.status === "Live");
  if (live.length > 0) {
    // If multiple live, pick latest by date/time
    return live.sort((a, b) => {
      const da = new Date(`${a.date} ${a.time || ""}`);
      const db = new Date(`${b.date} ${b.time || ""}`);
      return db - da;
    })[0];
  }

  // Otherwise pick most recent game overall
  return [...games].sort((a, b) => {
    const da = new Date(`${a.date} ${a.time || ""}`);
    const db = new Date(`${b.date} ${b.time || ""}`);
    return db - da;
  })[0];
}

export default function LiveGameHud({ games }) {
  const featured = pickFeaturedGame(games);

  if (!featured) return null;

  const isLive = featured.status === "Live";
  const isWin = featured.result === "W";
  const isLoss = featured.result === "L";
  const isTie = featured.result === "T";

  const statusLabel = isLive
    ? "LIVE NOW"
    : featured.result
    ? featured.result === "W"
      ? "FINAL • WIN"
      : featured.result === "L"
      ? "FINAL • LOSS"
      : "FINAL • TIE"
    : featured.status || "Scheduled";

  const statusColor = isLive
    ? "bg-green-500 text-black"
    : isWin
    ? "bg-green-500 text-black"
    : isLoss
    ? "bg-red-500 text-black"
    : isTie
    ? "bg-yellow-400 text-black"
    : "bg-sky-500 text-black";

  const scoreText =
    featured.gp31Runs != null && featured.oppRuns != null
      ? `${featured.gp31Runs} – ${featured.oppRuns}`
      : "-";

  return (
    <div className="mb-6 rounded-2xl border border-gold bg-[#0A1A3F] shadow-xl overflow-hidden animate-fadeIn">
      <div className="px-4 py-3 flex items-center justify-between gap-3 border-b border-gold/60">
        <div className="flex items-center gap-3">
          <div className="h-9 w-1 rounded-full bg-gold glow-gold" />
          <div>
            <div className="text-xs text-gray-300 uppercase tracking-wide">
              Featured Game
            </div>
            <div className="text-lg md:text-xl font-semibold text-gold glow-gold-text">
              {featured.teamName} vs {featured.opponent}
            </div>
          </div>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${statusColor} ${
            isLive ? "animate-pulse" : ""
          }`}
        >
          {statusLabel}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-3xl md:text-4xl font-bold text-white">
            {scoreText}
          </div>
          <div className="text-xs md:text-sm text-gray-300">
            <div>
              {featured.date}
              {featured.time ? ` • ${featured.time}` : ""}
            </div>
            {featured.location && (
              <div className="text-gray-400">{featured.location}</div>
            )}
            {featured.tournament && (
              <div className="text-gray-400 italic">
                {featured.tournament}
              </div>
            )}
          </div>
        </div>

        <div className="text-xs md:text-sm text-gray-400 md:text-right">
          <div>GP31 Featured Game HUD</div>
          <div className="text-[11px] text-gray-500">
            Powered by scraped GameChanger data.
          </div>
        </div>
      </div>
    </div>
  );
}
