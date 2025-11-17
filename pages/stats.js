import stats from "../data/gp31-stats.json";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   IMAGE HELPER
   ============================================================ */

function getPlayerImage(player) {
  if (!player || !player.first) return "/gallery/stock1.jpg";
  const safe = player.first.toLowerCase().trim();
  return `/gallery/${safe}_profile.jpg`;
}

/* ============================================================
   PLAYER BADGES (Power / Speed / Contact / Discipline)
   ============================================================ */

function computePlayerBadges(player) {
  const h = player.hitting;
  const pa = h.pa || 0;
  const ab = h.ab || 0;
  const bb = h.bb || 0;
  const so = h.so || 0;
  const hbp = h.hbp || 0;
  const sb = h.sb || 0;

  const bbRate = pa > 0 ? bb / pa : 0;
  const kRate = pa > 0 ? so / pa : 0;
  const contactRate = ab > 0 ? (ab - so) / ab : 0;
  const powerIndex = h.slg || 0;
  const speedIndex = sb; // simple: SB count

  const badges = [];

  if (powerIndex >= 0.650) badges.push({ type: "power", label: "Power 🔥" });
  if (speedIndex >= 15) badges.push({ type: "speed", label: "Speed ⚡" });
  if (contactRate >= 0.85) badges.push({ type: "contact", label: "Contact 👑" });
  if (bbRate > kRate && pa >= 20) badges.push({ type: "discipline", label: "Discipline 🎯" });

  return badges;
}

function PlayerBadges({ badges }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-1 text-[0.65rem]">
      {badges.map((b) => (
        <span
          key={b.type}
          className="px-2 py-[1px] rounded-full border border-gpGold/60 bg-black/40 text-gpGold"
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   PLAYER RADAR PROFILE (5-Tool model)
   ============================================================ */

function computeRadarProfile(player) {
  const h = player.hitting;
  const pa = h.pa || 0;
  const ab = h.ab || 0;
  const bb = h.bb || 0;
  const so = h.so || 0;
  const hbp = h.hbp || 0;
  const sb = h.sb || 0;

  return {
    contact: ab > 0 ? (ab - so) / ab : 0,
    power: h.slg || 0,
    speed: Math.min(1, sb / 25),
    obp: h.obp || 0,
    discipline: pa > 0 ? (bb + hbp) / pa : 0,
  };
}

/* ============================================================
   COMPUTE TOP 5 RADAR METRIC SETS (for gold dots)
   ============================================================ */

function computeTop5RadarSets(players) {
  const metrics = ["contact", "power", "speed", "obp", "discipline"];

  const profiles = players.map((p) => ({
    id: `${p.number}-${p.name}`,
    radar: computeRadarProfile(p),
  }));

  const result = {};

  for (const metric of metrics) {
    result[metric] = new Set(
      profiles
        .sort((a, b) => b.radar[metric] - a.radar[metric])
        .slice(0, 5)
        .map((x) => x.id)
    );
  }

  return result;
}

/* ============================================================
   MAIN STATS PAGE (GP31 Signature • Electric Blue Edition)
   ============================================================ */

export default function StatsPage() {
  const rawPlayers = stats.players.filter((p) => p.number !== "Glossary");
  const team = stats.team;

  // ----------------------------
  // AUTO-DETECT CORE ROSTER CUTOFF
  // ----------------------------
  const gpCutoff = useMemo(() => {
    const gps = rawPlayers.map((p) => p.hitting.gp).sort((a, b) => b - a);
    if (!gps.length) return 0;
    const cutoffIndex = Math.floor(gps.length * 0.75);
    return gps[cutoffIndex] || 0;
  }, [rawPlayers]);

  // UI State
  const [mode, setMode] = useState("core");
  const [activeMetric, setActiveMetric] = useState("obp");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Filtered players
  const players = useMemo(() => {
    return mode === "all"
      ? rawPlayers
      : rawPlayers.filter((p) => p.hitting.gp >= gpCutoff);
  }, [mode, rawPlayers, gpCutoff]);

  // Leaderboard metrics
  const leaderboardMetrics = [
    { id: "avg", label: "AVG", get: (p) => p.hitting.avg || 0, format: (v) => v.toFixed(3).slice(1) },
    { id: "obp", label: "OBP", get: (p) => p.hitting.obp || 0, format: (v) => v.toFixed(3).slice(1) },
    { id: "ops", label: "OPS", get: (p) => p.hitting.ops || 0, format: (v) => v.toFixed(3) },
    { id: "slg", label: "SLG", get: (p) => p.hitting.slg || 0, format: (v) => v.toFixed(3) },
    { id: "h", label: "Hits", get: (p) => p.hitting.h || 0, format: String },
    { id: "rbi", label: "RBI", get: (p) => p.hitting.rbi || 0, format: String },
    { id: "sb", label: "SB", get: (p) => p.hitting.sb || 0, format: String },
    { id: "xbh", label: "XBH", get: (p) => p.hitting.xbh || 0, format: String },
    { id: "qab", label: "QAB%", get: (p) => p.hitting.qabPct || 0, format: (v) => v.toFixed(1) + "%" },
  ];

  const currentMetric =
    leaderboardMetrics.find((m) => m.id === activeMetric) ||
    leaderboardMetrics[1];

  const leaderboardPlayers = useMemo(() => {
    const arr = [...players];
    arr.sort((a, b) => currentMetric.get(b) - currentMetric.get(a));
    return arr.slice(0, 8);
  }, [players, currentMetric]);

  // Team analytics
  const analytics = useMemo(() => {
    const totals = rawPlayers.reduce(
      (acc, p) => {
        const h = p.hitting;
        acc.pa += h.pa || 0;
        acc.ab += h.ab || 0;
        acc.h += h.h || 0;
        acc.bb += h.bb || 0;
        acc.so += h.so || 0;
        acc.hbp += h.hbp || 0;
        acc.tb += h.tb || 0;
        acc.xbh += h.xbh || 0;
        acc.sb += h.sb || 0;
        acc.cs += h.cs || 0;
        acc.roe += h.roe || 0;
        return acc;
      },
      {
        pa: 0, ab: 0, h: 0, bb: 0, so: 0,
        hbp: 0, tb: 0, xbh: 0, sb: 0, cs: 0, roe: 0,
      }
    );

    const contactRate = totals.ab > 0 ? (totals.ab - totals.so) / totals.ab : 0;
    const bbRate = totals.pa > 0 ? totals.bb / totals.pa : 0;
    const kRate = totals.pa > 0 ? totals.so / totals.pa : 0;
    const hbpRate = totals.pa > 0 ? totals.hbp / totals.pa : 0;
    const xbhRate = totals.ab > 0 ? totals.xbh / totals.ab : 0;

    const sbAttempts = totals.sb + totals.cs;
    const timesOnBase = totals.h + totals.bb + totals.hbp + totals.roe;
    const sbAgg = timesOnBase > 0 ? sbAttempts / timesOnBase : 0;
    const sbSuccess = sbAttempts > 0 ? totals.sb / sbAttempts : 0;

    const hardHitProxy = team.teamSlg * xbhRate * contactRate;
    const disciplineIndex = (bbRate + (1 - kRate)) / 2;

    return {
      totals,
      contactRate,
      bbRate,
      kRate,
      hbpRate,
      xbhRate,
      sbAgg,
      sbSuccess,
      hardHitProxy,
      disciplineIndex,
    };
  }, [rawPlayers, team]);

  // Top OPS — Gold halo set
  const mvpSet = useMemo(() => {
    const arr = [...rawPlayers].sort(
      (a, b) => (b.hitting.ops || 0) - (a.hitting.ops || 0)
    );
    const top5 = arr.slice(0, 5);
    return new Set(top5.map((p) => `${p.number}-${p.name}`));
  }, [rawPlayers]);

  // Top-5 radar metric sets
  const top5Radar = useMemo(
    () => computeTop5RadarSets(rawPlayers),
    [rawPlayers]
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100 px-6 py-12">
      {/* PAGE HEADER */}
      <h1 className="text-center text-4xl font-bold text-gpGold mb-2">
        GP31 • {team.seasonLabel} Stats Dashboard
      </h1>
      <p className="text-center text-xs text-slate-400 mb-8">
        Live season analytics powered by GameChanger data • GP31 Signature Edition
      </p>

      {/* TEAM METRICS */}
      <section className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Team AVG" value={team.teamAvg.toFixed(3).slice(1)} />
        <StatCard label="Team OBP" value={team.teamObp.toFixed(3).slice(1)} />
        <StatCard label="Team OPS" value={team.teamOps.toFixed(3)} />
        <StatCard label="Team SLG" value={team.teamSlg.toFixed(3)} />
      </section>

      {/* ROSTER FILTER */}
      <section className="mt-10 flex flex-wrap gap-4 items-center">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Roster View:
        </span>

        <button
          onClick={() => setMode("all")}
          className={`px-4 py-2 rounded-md border text-sm transition ${
            mode === "all"
              ? "bg-gpGold text-slate-900 border-gpGold shadow-[0_0_12px_rgba(253,184,39,0.6)]"
              : "bg-slate-900 text-slate-200 border-slate-700 hover:border-gpGold/60"
          }`}
        >
          Show All
        </button>

        <button
          onClick={() => setMode("core")}
          className={`px-4 py-2 rounded-md border text-sm transition ${
            mode === "core"
              ? "bg-sky-500 text-slate-950 border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.7)]"
              : "bg-slate-900 text-slate-200 border-slate-700 hover:border-sky-400/70"
          }`}
        >
          Core Roster ({gpCutoff}+ GP)
        </button>

        <span className="text-[0.7rem] text-slate-500">
          ({players.length} players shown)
        </span>
      </section>

      {/* TEAM ANALYTICS */}
      <section className="mt-12 border-t border-slate-800 pt-10">
        <TeamAnalyticsSection analytics={analytics} team={team} />
      </section>

      {/* LEADERBOARDS */}
      <section className="mt-12 border-t border-slate-800 pt-10">
        <Leaderboards
          leaderboardPlayers={leaderboardPlayers}
          leaderboardMetrics={leaderboardMetrics}
          activeMetric={activeMetric}
          setActiveMetric={setActiveMetric}
        />
      </section>

      {/* PLAYER CARDS */}
      <section className="mt-14 border-t border-slate-800 pt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gpGold tracking-wide">
          Player Stats
          <span className="block h-[2px] w-24 mt-1 bg-gradient-to-r from-gpGold via-sky-400/80 to-transparent" />
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((p) => (
            <PlayerCard
              key={p.number + p.name}
              player={p}
              isMvp={mvpSet.has(`${p.number}-${p.name}`)}
              onClick={() => setSelectedPlayer(p)}
            />
          ))}
        </div>
      </section>

      {/* PLAYER MODAL */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          isMvp={mvpSet.has(`${selectedPlayer.number}-${selectedPlayer.name}`)}
          top5Radar={top5Radar}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </main>
  );
}
/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-3 shadow-[0_0_25px_rgba(15,23,42,0.9)]">
      <div className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-gpGold">{value}</div>
    </div>
  );
}

/* ============================================================
   TEAM ANALYTICS SECTION
   ============================================================ */

function TeamAnalyticsSection({ analytics, team }) {
  const {
    totals,
    contactRate,
    bbRate,
    kRate,
    hbpRate,
    xbhRate,
    sbAgg,
    sbSuccess,
    hardHitProxy,
    disciplineIndex,
  } = analytics;

  const toPct = (v) => (v * 100).toFixed(1) + "%";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gpGold tracking-wide">
        Team Analytics
        <span className="block h-[2px] w-28 mt-1 bg-gradient-to-r from-gpGold via-sky-400/80 to-transparent" />
      </h2>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* OFFENSIVE IDENTITY */}
        <motion.div
          className="rounded-xl border border-slate-700/80 bg-gradient-to-br 
                     from-slate-950 via-slate-900 to-slate-950 p-4 
                     shadow-[0_0_35px_rgba(15,23,42,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-semibold text-gpGold mb-3 tracking-wide">
            Offensive Identity
          </h3>

          <AnalyticsBar label="OBP" value={team.teamObp} max={0.7} display={team.teamObp.toFixed(3)} />
          <AnalyticsBar label="SLG" value={team.teamSlg} max={0.9} display={team.teamSlg.toFixed(3)} />
          <AnalyticsBar label="Contact Rate" value={contactRate} max={1} display={toPct(contactRate)} />
          <AnalyticsBar label="XBH Rate" value={xbhRate} max={0.6} display={toPct(xbhRate)} />
          <AnalyticsBar label="Hard-Hit Proxy" value={hardHitProxy} max={0.6} display={hardHitProxy.toFixed(3)} />
        </motion.div>

        {/* PLATE DISCIPLINE */}
        <motion.div
          className="rounded-xl border border-slate-700/80 bg-gradient-to-br 
                     from-slate-950 via-slate-900 to-slate-950 p-4 
                     shadow-[0_0_35px_rgba(15,23,42,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-semibold text-gpGold mb-3 tracking-wide">
            Plate Discipline
          </h3>

          <AnalyticsBar label="BB Rate" value={bbRate} max={0.4} display={toPct(bbRate)} />
          <AnalyticsBar label="K Rate" value={kRate} max={0.4} inverse display={toPct(kRate)} />
          <AnalyticsBar label="HBP Rate" value={hbpRate} max={0.15} display={toPct(hbpRate)} />
          <AnalyticsBar label="Discipline Index" value={disciplineIndex} max={1} display={disciplineIndex.toFixed(3)} />
        </motion.div>

        {/* SPEED & PRESSURE */}
        <motion.div
          className="rounded-xl border border-slate-700/80 bg-gradient-to-br 
                     from-slate-950 via-slate-900 to-slate-950 p-4 
                     shadow-[0_0_35px_rgba(15,23,42,0.9)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-semibold text-gpGold mb-3 tracking-wide">
            Speed & Pressure
          </h3>

          <div className="text-xs text-slate-300 space-y-1 mb-4">
            <div>
              SB Attempts:{" "}
              <span className="font-semibold">{totals.sb + totals.cs}</span>{" "}
              ({totals.sb} SB / {totals.cs} CS)
            </div>
            <div>
              SB Success: <span className="font-semibold">{toPct(sbSuccess)}</span>
            </div>
            <div>
              SB Aggression (Att/TOB):{" "}
              <span className="font-semibold">{toPct(sbAgg)}</span>
            </div>
          </div>

          <AnalyticsBar label="SB Success" value={sbSuccess} max={1} display={toPct(sbSuccess)} />
          <AnalyticsBar label="Aggression" value={sbAgg} max={1} display={toPct(sbAgg)} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ANALYTICS BAR — Full + Compact (Statcast style)
   ============================================================ */

function AnalyticsBar({ label, value, max, display, inverse, compact = false }) {
  const pct = Math.max(
    0,
    Math.min(100, ((inverse ? max - value : value) / max) * 100)
  );

  return (
    <div className={compact ? "mb-1" : "mb-3"}>
      {/* Only show header in full mode */}
      {!compact && (
        <div className="flex justify-between text-[0.65rem] text-slate-400 mb-1">
          <span className="uppercase tracking-wide">{label}</span>
          <span className="font-mono text-slate-100">{display}</span>
        </div>
      )}

      <div
        className={`overflow-hidden rounded-full border ${
          compact
            ? "h-[7px] bg-slate-800 border-slate-700"
            : "h-[12px] bg-slate-900 border-slate-700"
        }`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r
                     from-gpGold via-sky-400/90 to-emerald-300/40
                     shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Compact value under bar */}
      {compact && (
        <div className="text-right text-[0.6rem] text-slate-400 mt-[2px] font-mono">
          {display}
        </div>
      )}
    </div>
  );
}
/* ============================================================
   LEADERBOARDS — GP31 Signature Electric Edition
   ============================================================ */

function Leaderboards({
  leaderboardPlayers,
  leaderboardMetrics,
  activeMetric,
  setActiveMetric,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gpGold tracking-wide">
          Leaderboards
          <span className="block h-[2px] w-24 mt-1 bg-gradient-to-r from-gpGold via-sky-400/80 to-transparent" />
        </h2>

        {/* METRIC SWITCHER */}
        <div className="flex flex-wrap gap-2 text-xs">
          {leaderboardMetrics.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              className={`px-3 py-1 rounded-full border transition-all
                ${
                  activeMetric === m.id
                    ? "bg-gpGold text-slate-900 border-gpGold shadow-[0_0_12px_rgba(253,184,39,0.7)]"
                    : "bg-slate-900 text-slate-300 border-slate-700 hover:border-sky-400/70 hover:text-sky-300"
                }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* PLAYER ROWS */}
      <div className="space-y-3">
        {leaderboardPlayers.map((p, i) => {
          const metric = leaderboardMetrics.find((m) => m.id === activeMetric);
          const val = metric.get(p);
          const max = metric.get(leaderboardPlayers[0]) || 1;

          // Tier glow logic: #1 gold, #2-3 amber, #4-5 blue
          const tierGlow =
            i === 0
              ? "shadow-[0_0_18px_rgba(253,184,39,0.7)] border-gpGold"
              : i < 3
              ? "shadow-[0_0_12px_rgba(251,191,36,0.45)] border-amber-300/70"
              : i < 5
              ? "shadow-[0_0_10px_rgba(56,189,248,0.45)] border-sky-400/70"
              : "border-slate-700";

          return (
            <motion.div
              key={p.number + p.name + activeMetric}
              className={`p-3 rounded-xl bg-slate-950/60 backdrop-blur-sm border ${tierGlow}
                transition-all hover:scale-[1.008]`}
              layout
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 text-slate-500">{i + 1}.</span>

                  <span className="font-semibold text-slate-100">
                    {p.name}
                  </span>

                  {/* tiny metric tag */}
                  <span className="text-[0.6rem] px-2 py-[1px] rounded-full bg-slate-900 border border-slate-600 text-slate-300 ml-2">
                    {metric.label}
                  </span>
                </div>

                <div className="text-[0.65rem] text-slate-400">
                  GP: {p.hitting.gp}
                </div>
              </div>

              {/* STATCAST-STYLE BAR */}
              <AnalyticsBar
                label={metric.label}
                value={val}
                max={max}
                display={metric.format(val)}
                compact
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
/* ============================================================
   PLAYER CARD + BADGES + MVP HALO
   ============================================================ */

function PlayerCard({ player, onClick, isMvp }) {
  const h = player.hitting;
  const imgSrc = getPlayerImage(player);
  const badges = computePlayerBadges(player);

  return (
    <motion.button
      onClick={onClick}
      className={`text-left rounded-xl border 
                 ${
                   isMvp
                     ? "border-gpGold shadow-[0_0_30px_rgba(253,184,39,0.6)]"
                     : "border-slate-800 shadow-[0_0_18px_rgba(0,0,0,0.9)]"
                 }
                 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 
                 p-4 hover:border-gpGold/80 transition`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="relative">
          {isMvp && (
            <>
              <div className="absolute inset-0 rounded-full border-[3px] border-amber-400 opacity-90 animate-pulse pointer-events-none shadow-[0_0_15px_rgba(255,215,0,0.9)]" />
              <div className="absolute inset-1 rounded-full border border-amber-300/70 pointer-events-none" />
            </>
          )}

          <img
            src={imgSrc}
            alt={player.name}
            className="w-12 h-12 rounded-full object-cover border border-slate-700 shadow-md"
          />
        </div>

        <div>
          <div className="text-sm text-slate-400">#{player.number}</div>
          <div className="text-lg font-semibold text-slate-50">
            {player.name || "Unknown"}
          </div>
          <PlayerBadges badges={badges} />
        </div>

        <div className="ml-auto text-xs text-slate-400">GP: {h.gp}</div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <Mini label="AVG" value={h.avg.toFixed(3).slice(1)} />
        <Mini label="OBP" value={h.obp.toFixed(3).slice(1)} />
        <Mini label="OPS" value={h.ops.toFixed(3)} />
        <Mini label="H" value={h.h} />
        <Mini label="2B" value={h.double} />
        <Mini label="3B" value={h.triple} />
        <Mini label="HR" value={h.hr} />
        <Mini label="RBI" value={h.rbi} />
        <Mini label="SB" value={h.sb} />
      </div>
    </motion.button>
  );
}

function Mini({ label, value }) {
  return (
    <div>
      <div className="text-[0.65rem] uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

/* ============================================================
   PLAYER MODAL + RADAR + SHARE CARD
   ============================================================ */

function PlayerModal({ player, onClose, isMvp, top5Radar }) {
  const h = player.hitting;
  const imgSrc = getPlayerImage(player);
  const slash = `${h.avg.toFixed(3).slice(1)} / ${h.obp.toFixed(3).slice(1)} / ${h.slg.toFixed(3)}`;
  const badges = computePlayerBadges(player);
  const radar = computeRadarProfile(player);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-xl w-full rounded-2xl border border-gpGold/60 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 shadow-[0_0_40px_rgba(0,0,0,1)] relative"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-100 text-xl"
          >
            ×
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              {isMvp && (
                <div className="absolute inset-0 rounded-full border-2 border-gpGold animate-pulse pointer-events-none" />
              )}
              <img
                src={imgSrc}
                alt={player.name}
                className="w-14 h-14 rounded-full object-cover border border-gpGold/60 shadow-md"
              />
            </div>

            <div>
              <div className="text-sm text-slate-400">#{player.number}</div>
              <h3 className="text-2xl font-bold text-gpGold">{player.name}</h3>
              <p className="mt-1 text-xs text-slate-400">
                GP: {h.gp} • PA: {h.pa} • AB: {h.ab}
              </p>
              <PlayerBadges badges={badges} />
            </div>
          </div>

          {/* Middle: Radar + Share Card Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PlayerRadar radar={radar} player={player} top5Radar={top5Radar} />
            <ShareCardPreview player={player} imgSrc={imgSrc} badges={badges} slash={slash} />
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <ModalStat label="Slash" value={slash} />
              <ModalStat
                label="Hits"
                value={`${h.h} (${h.single} 1B, ${h.double} 2B, ${h.triple} 3B, ${h.hr} HR)`}
              />
              <ModalStat label="R / RBI" value={`${h.r} / ${h.rbi}`} />
              <ModalStat label="SB / CS" value={`${h.sb} / ${h.cs}`} />
              <ModalStat
                label="QAB%"
                value={h.qabPct != null ? h.qabPct.toFixed(1) + "%" : "-"}
              />
            </div>

            <div className="space-y-2">
              <ModalStat
                label="BABIP"
                value={h.babip != null ? h.babip.toFixed(3) : "-"}
              />
              <ModalStat
                label="BA w/ RISP"
                value={h.baRisp != null ? h.baRisp.toFixed(3) : "-"}
              />
              <ModalStat label="2-Out RBI" value={String(h.twoOutRbi)} />
              <ModalStat label="Total Bases" value={String(h.tb)} />
              <ModalStat label="XBH" value={String(h.xbh)} />
            </div>
          </div>

          <p className="mt-4 text-[0.7rem] text-slate-500">
            * Stats are season-to-date from GameChanger export.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ModalStat({ label, value }) {
  return (
    <div>
      <div className="text-[0.65rem] uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="text-sm text-slate-100">{value}</div>
    </div>
  );
}

/* ============================================================
   PLAYER RADAR (Animated + Axis Labels + Top-5 Highlights)
   ============================================================ */

function PlayerRadar({ radar, player, top5Radar }) {
  const size = 140;
  const center = size / 2;
  const radius = 45;

  const axes = [
    { key: "contact", label: "Contact", value: radar.contact },
    { key: "power", label: "Power", value: radar.power },
    { key: "speed", label: "Speed", value: radar.speed },
    { key: "obp", label: "On-Base", value: radar.obp },
    { key: "discipline", label: "Discipline", value: radar.discipline },
  ];

  const getPoints = (scale = 1) =>
    axes.map((axis, i) => {
      const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
      const r = (axis.value || 0) * radius * scale;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    });

  const [animScale, setAnimScale] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setAnimScale(1), 50);
    return () => clearTimeout(timeout);
  }, []);

  const animatedPoints = getPoints(animScale).join(" ");

  return (
    <div className="flex flex-col items-center justify-center text-xs">
      <svg width={size} height={size} className="opacity-95">
        {/* Rings */}
        {[1, 0.66, 0.33].map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * r}
            stroke="#334155"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Fill polygon */}
        <motion.polygon
          points={animatedPoints}
          fill="rgba(56,189,248,0.20)"
          stroke="rgba(253,184,39,0.85)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Points */}
        {axes.map((axis, i) => {
          const [x, y] = getPoints(animScale)[i].split(",").map(Number);
          const isTop5 =
            top5Radar?.[axis.key]?.has(`${player.number}-${player.name}`);

          return (
            <circle
              key={axis.key}
              cx={x}
              cy={y}
              r={isTop5 ? 4 : 3}
              fill={isTop5 ? "#FBBF24" : "#cbd5e1"}
              stroke={isTop5 ? "#FBBF24" : "#475569"}
              strokeWidth={isTop5 ? 3 : 1.5}
            />
          );
        })}

        {/* Axis labels */}
        {axes.map((axis, i) => {
          const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
          const labelRadius = radius + 22;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <text
              key={axis.key}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#94a3b8"
              fontSize="8"
              fontWeight="500"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      {/* Numeric summaries */}
      <div className="grid grid-cols-2 gap-1 mt-3 text-[0.6rem] text-slate-300">
        {axes.map((axis) => (
          <div key={axis.key} className="flex justify-between w-32">
            <span>{axis.label}</span>
            <span className="font-mono">{axis.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SHARE CARD PREVIEW
   ============================================================ */

function ShareCardPreview({ player, imgSrc, badges, slash }) {
  const h = player.hitting;

  return (
    <div className="rounded-xl border border-gpGold/50 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-3 text-xs shadow-[0_0_25px_rgba(15,23,42,0.9)]">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={imgSrc}
          alt={player.name}
          className="w-10 h-10 rounded-full object-cover border border-gpGold/60"
        />
        <div>
          <div className="text-[0.65rem] text-slate-400">
            GP31 Baseball • {player.number}
          </div>
          <div className="text-sm font-semibold text-gpGold">
            {player.name}
          </div>
          <PlayerBadges badges={badges} />
        </div>
      </div>

      <div className="text-[0.65rem] text-slate-300 space-y-1">
        <div>Slash: {slash}</div>
        <div>
          H: {h.h} • XBH: {h.xbh} • RBI: {h.rbi} • SB: {h.sb}
        </div>
        <div>OBP: {h.obp.toFixed(3)} • OPS: {h.ops.toFixed(3)}</div>
      </div>

      <div className="mt-2 text-[0.6rem] text-slate-500">
        Fall {new Date().getFullYear()} • GP31 11U
      </div>
    </div>
  );
}
