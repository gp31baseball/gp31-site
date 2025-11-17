import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const csvPath = path.join(process.cwd(), "data/raw/gp31-season.csv");

// Read file
let csvText = fs.readFileSync(csvPath, "utf8");

// Strip UTF-8 BOM if present (file-level)
if (csvText.charCodeAt(0) === 0xFEFF) {
  csvText = csvText.slice(1);
}

// Parse CSV (use any[][] so TypeScript chills out)
let rows: any[][] = parse(csvText, { skip_empty_lines: true });

// GameChanger banner row (NaN, NaN, NaN, "Batting", ...) – drop it
rows = rows.slice(1);

// Row 0 is now the REAL header row
const rawHeaders = rows[0] || [];
const headers: string[] = rawHeaders.map((h: any) =>
  h == null ? "" : String(h).trim()
);

// Player data rows
const dataRows = rows.slice(1);

// Helper: parse numeric values
const num = (val: string): number | null => {
  if (!val || val === "-" || val.trim() === "") return null;
  const cleaned = val.replace("%", "");
  const n = Number(cleaned);
  return Number.isNaN(n) ? null : n;
};

const players = dataRows
  .filter((row) => row[0] && row[0] !== "Totals")
  .map((row) => {
    const get = (label: string): string => {
      const idx = headers.indexOf(label);
      if (idx === -1) return "";
      const cell = row[idx];
      return cell == null ? "" : String(cell).trim();
    };

    const number = get("Number");
    const first = get("First");
    const last = get("Last");

    const hitting = {
      gp: num(get("GP")) ?? 0,
      pa: num(get("PA")) ?? 0,
      ab: num(get("AB")) ?? 0,
      avg: num(get("AVG")) ?? 0,
      obp: num(get("OBP")) ?? 0,
      ops: num(get("OPS")) ?? 0,
      slg: num(get("SLG")) ?? 0,
      h: num(get("H")) ?? 0,
      single: num(get("1B")) ?? 0,
      double: num(get("2B")) ?? 0,
      triple: num(get("3B")) ?? 0,
      hr: num(get("HR")) ?? 0,
      rbi: num(get("RBI")) ?? 0,
      r: num(get("R")) ?? 0,
      bb: num(get("BB")) ?? 0,
      so: num(get("SO")) ?? 0,
      hbp: num(get("HBP")) ?? 0,
      sac: num(get("SAC")) ?? 0,
      sf: num(get("SF")) ?? 0,
      roe: num(get("ROE")) ?? 0,
      fc: num(get("FC")) ?? 0,
      sb: num(get("SB")) ?? 0,
      sbPct: num(get("SB%")),
      cs: num(get("CS")) ?? 0,
      qab: num(get("QAB")) ?? 0,
      qabPct: num(get("QAB%")),
      tb: num(get("TB")) ?? 0,
      xbh: num(get("XBH")) ?? 0,
      babip: num(get("BABIP")),
      baRisp: num(get("BA/RISP")),
      twoOutRbi: num(get("2OUTRBI")) ?? 0,
    };

    return {
      number,
      first,
      last,
      name: `${first} ${last}`.trim(),
      hitting,
    };
  });

const team = {
  seasonLabel: "11U Fall 2025",
  teamAvg:
    players.reduce((s, p) => s + (p.hitting.avg || 0), 0) / players.length,
  teamObp:
    players.reduce((s, p) => s + (p.hitting.obp || 0), 0) / players.length,
  teamOps:
    players.reduce((s, p) => s + (p.hitting.ops || 0), 0) / players.length,
  teamSlg:
    players.reduce((s, p) => s + (p.hitting.slg || 0), 0) / players.length,
  teamRuns: players.reduce((s, p) => s + (p.hitting.r || 0), 0),
  teamHits: players.reduce((s, p) => s + (p.hitting.h || 0), 0),
};

const outPath = path.join(process.cwd(), "data/gp31-stats.json");
fs.writeFileSync(outPath, JSON.stringify({ team, players }, null, 2));

console.log("✔ gp31-stats.json built successfully");
