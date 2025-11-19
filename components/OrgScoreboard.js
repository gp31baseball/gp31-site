// components/OrgScoreboard.js

const TEAM_ORDER = ["11u", "12u-navy", "12u-gold", "13u", "14u", "15u"];

function groupGamesByTeam(games) {
  const map = new Map();
  games.forEach((g) => {
    if (!map.has(g.teamKey)) map.set(g.teamKey, []);
    map.get(g.teamKey).push(g);
  });

  TEAM_ORDER.forEach((teamKey) => {
    if (map.has(teamKey)) {
      map.get(teamKey).sort((a, b) => {
        const da = new Date(`${a.date} ${a.time || ""}`);
        const db = new Date(`${b.date} ${b.time || ""}`);
        return db - da;
      });
    }
  });

  return map;
}

export default function OrgScoreboard({ games }) {
  const grouped = groupGamesByTeam(games);

  return (
    <div className="space-y-8 animate-fadeIn">
      {TEAM_ORDER.map((teamKey) => {
        const teamGames = grouped.get(teamKey) || [];
        const teamName =
          teamGames.length > 0 ? teamGames[0].teamName : teamKey.toUpperCase();

        return (
          <section
            key={teamKey}
            className="rounded-2xl border border-gray-900/70 bg-[#111318] shadow-lg overflow-hidden"
          >
            {/* TEAM HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold bg-[#0A1A3F] shadow-md">
              <div className="flex items-center gap-3">
                <div className="h-9 w-1 rounded-full bg-gold glow-gold"></div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gold glow-gold-text">
                    {teamName}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300">
                    {teamGames.length > 0
                      ? `Last ${Math.min(teamGames.length, 5)} games`
                      : "No recent games recorded"}
                  </p>
                </div>
              </div>
            </div>

            {/* EMPTY MESSAGE */}
            {teamGames.length === 0 ? (
              <div className="p-6 text-center text-gray-500 italic">
                No games available for this team yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-black/40 border-b border-gray-800 text-gray-300">
                    <tr>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Opponent</th>
                      <th className="px-3 py-2 text-center">Status</th>
                      <th className="px-3 py-2 text-center">Score</th>
                      <th className="px-3 py-2 text-left hidden md:table-cell">
                        Location
                      </th>
                      <th className="px-3 py-2 text-left hidden md:table-cell">
                        Tournament
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {teamGames.slice(0, 5).map((g) => {
                      const isLive = g.status === "Live";
                      const isWin = g.result === "W";
                      const isLoss = g.result === "L";
                      const isTie = g.result === "T";

                      const resultColor = isLive
                        ? "text-green-400"
                        : isWin
                        ? "text-green-400"
                        : isLoss
                        ? "text-red-400"
                        : isTie
                        ? "text-yellow-300"
                        : "text-gray-300";

                      return (
                        <tr
                          key={g.gameId}
                          className={`
                            border-b border-gray-800/60 hover:bg-white/5 transition
                            ${isLive ? "animate-livePulse" : ""}
                          `}
                        >
                          <td className="px-3 py-2 whitespace-nowrap">
                            {g.date} {g.time ? `• ${g.time}` : ""}
                          </td>

                          <td className="px-3 py-2">{g.opponent}</td>

                          <td
                            className={`px-3 py-2 text-center font-semibold ${resultColor}`}
                          >
                            {isLive ? (
                              <span className="text-green-400 font-bold animate-pulse">
                                LIVE
                              </span>
                            ) : (
                              g.result || g.status || "-"
                            )}
                          </td>

                          <td className="px-3 py-2 text-center whitespace-nowrap">
                            {g.gp31Runs !== null && g.oppRuns !== null
                              ? `${g.gp31Runs}–${g.oppRuns}`
                              : "-"}
                          </td>

                          <td className="px-3 py-2 hidden md:table-cell">
                            {g.location || "-"}
                          </td>

                          <td className="px-3 py-2 hidden md:table-cell">
                            {g.tournament || "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
