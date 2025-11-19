// pages/api/gp31-scoreboard.js

import { scrapeTeamSchedule } from "../../lib/gcBrowserScraper";

// TEAM CONFIGURATION
const TEAM_CONFIG = [
  {
    key: "11u",
    name: "11U",
    url: "https://web.gc.com/teams/YxqpAc8LQ2B5/2025-fall-gp31-11u/schedule",
  },
  {
    key: "12u-gold",
    name: "12U Gold",
    url: "https://web.gc.com/teams/kPPygHXNaNJL/2025-fall-gp31-gold-12u/schedule",
  },
  {
    key: "12u-navy",
    name: "12U Navy",
    url: null,
  },
  {
    key: "13u",
    name: "13U",
    url: null,
  },
  {
    key: "14u",
    name: "14U",
    url: null,
  },
  {
    key: "15u",
    name: "15U",
    url: null,
  },
];

// ---------------------------------------------------------
// NORMALIZER: Convert raw scrape data → scoreboard objects
// ---------------------------------------------------------
function normalizeGame(raw, teamKey, teamName, idx) {
  // Skip empty GC rows
  if (!raw.opponentRaw && !raw.scoreRaw && !raw.dateRaw) return null;

  // Clean opponent for display (remove vs./@)
  const opponent = raw.opponentRaw
    ? raw.opponentRaw.replace(/^vs\.\s*/i, "").replace(/^@\s*/i, "").trim()
    : null;

  // Parse score like: "W 6-5"
  let gp31Runs = null;
  let oppRuns = null;
  let result = null;

  if (raw.scoreRaw) {
    const m = raw.scoreRaw.match(/([WLT])\s*(\d+)[–-](\d+)/);
    if (m) {
      result = m[1]; // W, L, or T
      gp31Runs = parseInt(m[2]);
      oppRuns = parseInt(m[3]);
    }
  }

  // Convert "6" into YYYY-MM-DD
  let date = null;
  if (raw.dateRaw) {
    const day = parseInt(raw.dateRaw);
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  return {
    teamKey,
    teamName,
    gameId: `${teamKey}-${idx}`,
    date,
    dateRaw: raw.dateRaw,
    opponent,
    opponentRaw: raw.opponentRaw,
    location: raw.locationRaw,
    scoreText: raw.scoreRaw,
    result,
    gp31Runs,
    oppRuns,
    status: result ? "Final" : "Scheduled",
  };
}

// ---------------------------------------------------------
// API HANDLER
// ---------------------------------------------------------
export default async function handler(req, res) {
  const allGames = [];

  try {
    for (const team of TEAM_CONFIG) {
      if (!team.url) continue;

      const rawGames = await scrapeTeamSchedule(
        team.key,
        team.name,
        team.url
      );

      rawGames.forEach((g, idx) => {
        const normalized = normalizeGame(g, team.key, team.name, idx);
        if (normalized) allGames.push(normalized);
      });
    }

    return res.status(200).json({ games: allGames });
  } catch (err) {
    console.error("Error in gp31-scoreboard API:", err);
    return res.status(500).json({
      games: [],
      error: err.toString(),
    });
  }
}

