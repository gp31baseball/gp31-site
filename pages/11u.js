/***************  CLEAN START  ***************/
import { useEffect, useState } from "react";
import { Trophy, Star, Zap, Medal, Crown } from "lucide-react";
import Papa from "papaparse";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function Home() {
  const [leaders, setLeaders] = useState({ hr: [], avg: [], sb: [] });
  const [lastUpdated, setLastUpdated] = useState("");

  /* Load GameChanger */
  useEffect(() => {
    try {
      const s = document.createElement("script");
      s.src = "https://widgets.gc.com/static/js/sdk.v1.js";
      s.async = true;
      s.onload = () => {
        if (window.GC?.team?.schedule?.init) {
          window.GC.team.schedule.init({
            target: "#gc-schedule-widget-yduq",
            widgetId: "d5747b9c-b13f-4cd2-b6b5-d00860d7ca4a",
            maxVerticalGamesVisible: 10,
          });
          setTimeout(() => {
            const box = document.getElementById("gc-schedule-widget-yduq");
            if (box) box.scrollTop = box.scrollHeight;
          }, 2500);
        }
      };
      document.body.appendChild(s);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  /* Load CSV */
  useEffect(() => {
    fetch("/data/team_stats.csv")
      .then((r) => r.text())
      .then((csv) => {
        setLastUpdated(new Date().toLocaleString());
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim().toLowerCase(),
          beforeFirstChunk: (chunk) => {
            const L = chunk.split(/\r?\n/);
            const idx = L.findIndex((x) =>
              x.toLowerCase().startsWith("number,last,first")
            );
            return L.slice(idx).join("\n");
          },
          complete: ({ data }) => {
            const cleaned = data
              .filter((p) => {
                const f = (p.first || p.First || "").trim();
                const l = (p.last || p.Last || "").trim();
                return (
                  f &&
                  !f.toLowerCase().includes("glossary") &&
                  !l.toLowerCase().includes("totals")
                );
              })
              .map((p) => {
                const k = Object.fromEntries(
                  Object.entries(p).map(([a, b]) => [a.trim().toLowerCase(), b])
                );
                const ab = parseInt(k.ab || 0);
                const hits = parseInt(k.h || 0);
                const hr = parseInt(k.hr || 0);
                const sb = parseInt(k.sb || 0);

                const raw =
                  k.avg && !isNaN(parseFloat(k.avg))
                    ? parseFloat(k.avg)
                    : ab > 0
                    ? hits / ab
                    : 0;

                return {
                  name: (k.first || "").trim(),
                  ab,
                  hits,
                  hr,
                  sb,
                  avg: parseFloat(raw.toFixed(3)),
                  displayAvg:
                    raw > 0 ? `.${raw.toFixed(3).split(".")[1]}` : ".000",
                };
              });

            const batters = cleaned.filter((p) => p.ab > 10);

            setLeaders({
              hr: batters.filter((p) => p.hr > 0).sort((a, b) => b.hr - a.hr).slice(0, 5),
              avg: batters.sort((a, b) => b.avg - a.avg).slice(0, 5),
              sb: cleaned.filter((p) => p.sb > 0).sort((a, b) => b.sb - a.sb).slice(0, 5),
            });
          },
        });
      });
  }, []);

  /* Coaches */
const coaches = [
  { 
    name: "Gregorio Petit", 
    image: "/gallery/gregorio.jpg", 
    bio: "Former MLB infielder (A’s, Astros, Yankees, Angels, Twins). Current manager of the Midland RockHounds. Brings big-league experience, elite infield instruction, and a championship-level leadership mindset."
  },
  { 
    name: "Javier Betancourt", 
    image: "/gallery/javier.jpg", 
    bio: "Venezuelan former Detroit Tigers minor-league infielder. Highly respected for his advanced infield IQ, competitive edge, and ability to develop young players with pro-level detail."
  },
  { 
    name: "Andres Sthormes", 
    image: "/gallery/andres.jpg", 
    bio: "Former catcher (Detroit Tigers, Miami Marlins) and GP31’s catching coach. Expert at developing hitters, managing pitchers, and refining defensive fundamentals behind the plate."
  },
  { 
    name: "Jose Carrillo", 
    image: "/gallery/jose_carrillo.jpg", 
    bio: "Venezuelan-born former professional player in the Houston Astros organization (Tri-City ValleyCats / GCL Astros). Serves as GP31’s all-purpose coach, bringing versatile experience and strong leadership across all areas of player development."
  },
  { 
    name: "Mario Fernandez", 
    image: "/gallery/mario.jpg", 
    bio: "Former pitcher (Tampa Bay Rays). Specializes in developing young arms, teaching mound presence, and controlling tempo under pressure."
  }
];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerContainer = {
    show: { transition: { staggerChildren: 0.2 } },
  };

  /* OPEN RETURN */
  return (
    <div className="min-h-screen bg-[#07132F] text-white flex flex-col items-center overflow-x-hidden">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center mt-8 mb-8"
      >
        <img src="/gp31-logo.png" className="mx-auto mb-4 w-[200px]" />
        <h1 className="text-5xl font-bold text-[#D4AF37]">GP31 Baseball 11U</h1>
        <p className="text-xl italic text-gray-200 mt-2 animate-pulse">
          “If God is for us, who can be against us” — Romans 8:31
        </p>
      </motion.header>


      {/* ANALYTICS HERO BLOCK */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="bg-[#10224F] border-y-2 border-[#D4AF37] py-12 px-6 md:px-12 mb-12 
                   shadow-[0_0_25px_rgba(255,215,0,0.15)]"
      >
        <div className="max-w-3xl mx-auto text-center">

          <div className="flex justify-center gap-6 mb-4 text-[#FFD700]">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 20v-6m6 6V4m6 16v-9m6 9V8" />
            </svg>
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
              <path strokeWidth="2" d="M12 2v3m0 14v3m10-10h-3M5 12H2" />
            </svg>
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <path strokeWidth="2" d="M7 4.5c1.5 2 1.5 13 0 15m10-15c-1.5 2-1.5 13 0 15" />
            </svg>
          </div>

          <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
            GP31 Advanced Stats & Analytics Hub
          </h2>

          <p className="text-gray-200 text-lg mb-5">
            Our <span className="font-bold text-[#FFD700]">full analytics platform</span> tracks OBP, OPS, XBH,
            contact rate, discipline index, radar profiles, and more.
          </p>

          <p className="text-gray-300 text-sm italic mb-8">
            Powered by the GP31 Development Engine — built for growth, competition, and clarity.
          </p>

          <a
            href="/stats"
            className="inline-block bg-[#FFD700] text-[#0A1A3F] font-semibold py-3 px-7 rounded-xl 
                       shadow-md hover:bg-amber-300 hover:scale-105 transition"
          >
            → View the GP31 Analytics Dashboard
          </a>
        </div>
      </motion.section>

      {/* MAIN GRID WRAPPER */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 w-full max-w-7xl px-6 pb-16"
      >

        {/* LEFT COLUMN — COACHES */}
        <motion.div
          variants={fadeUp}
          className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg self-start"
        >
          <div className="flex items-center mb-4">
            <Medal className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold text-[#FFD700]">About Coaches</h2>
          </div>

          {coaches.map((coach, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="mb-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              {coach.name === "Mario Fernandez" ? (
                <a
                  href="https://calendar.app.google/F9CSGfwr3FU5Djqr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block"
                >
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-[#FFD700] object-cover 
                               shadow-md group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 
                                   bg-[#FFD700] text-[#0A1A3F] text-xs font-bold px-2 py-0.5 rounded">
                    Click to schedule
                  </span>
                </a>
              ) : (
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-[#D4AF37] object-cover"
                />
              )}

              <p className="text-lg font-bold text-[#FFD700]">{coach.name}</p>
              <p className="text-gray-200 text-sm">{coach.bio}</p>
            </motion.div>
          ))}
        </motion.div>



        {/* CENTER COLUMN — TOURNAMENTS + RECENT GAMES */}
        <motion.div variants={fadeUp} className="space-y-10">

          {/* TOURNAMENT BLOCK */}
          <motion.div
            variants={fadeUp}
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg text-center space-y-10"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#FFD700] drop-shadow">
                2025 Perfect Game Tournament Champions
              </h2>
              <p className="text-gray-300 italic text-sm">
                GP31 Baseball — 3× Champions (Fall 2025)
              </p>
            </div>

            {/* TOURNAMENT CARDS */}
            {[
              {
                banner: "/gallery/tourn-wins/double-play-banner.png",
                pic: "/gallery/tourn-wins/double-play-pic.jpg",
                caption: "2025 11U PGBA Double Play Classic Champions — Houston, TX",
              },
              {
                banner: "/gallery/tourn-wins/gold-cup-banner.png",
                pic: "/gallery/tourn-wins/gold-cup-pic.jpg",
                caption: "2025 11U PGBA Gold Cup Classic Champions — Houston, TX",
              },
              {
                banner: "/gallery/tourn-wins/battle-rings-banner.png",
                pic: "/gallery/tourn-wins/battle-rings-pic.jpg",
                caption: "2025 11U PG Battle for the Rings Champions — Tomball, TX",
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="bg-[#0F1E3E] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg"
              >
                <img
                  src={t.banner}
                  className="rounded-lg border-2 border-[#D4AF37] shadow mb-3 mx-auto w-full max-w-[500px] object-contain"
                  alt=""
                />
                <img
                  src={t.pic}
                  className="rounded-lg border-4 border-[#D4AF37] shadow-xl mx-auto w-full max-w-[700px] object-cover"
                  alt=""
                />
                <p className="text-[#FFD700] italic mt-3 text-sm">{t.caption}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* RECENT GAMES */}
          <motion.div
            variants={fadeUp}
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 min-h-[720px] shadow-lg flex flex-col"
          >
            <div className="flex items-center justify-center mb-4">
              <Trophy className="text-[#D4AF37] mr-2" />
              <h2 className="text-2xl font-semibold text-[#FFD700]">Recent Games</h2>
            </div>

            <div
              id="gc-schedule-widget-yduq"
              className="border-2 border-[#D4AF37] rounded-xl p-4 bg-[#0F1E3E] shadow-md w-full h-full"
            ></div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — STATS + SOCIALS */}
        <motion.div variants={fadeUp} className="space-y-6">

          {/* Stat Boxes */}
          <StatBox title="Home Runs" statList={leaders.hr} statKey="hr" icon={<Crown />} />
          <StatBox title="Batting Avg" statList={leaders.avg} statKey="avg" icon={<Star />} />
          <StatBox title="Stolen Bases" statList={leaders.sb} statKey="sb" icon={<Zap />} />

          {/* SOCIAL BANNER */}
          <div
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow 
                       flex flex-col items-center text-center space-y-3"
          >
            <img
              src="/gallery/social-preview.jpg"
              className="rounded-lg border-2 border-[#D4AF37] shadow w-full max-w-[350px]"
              alt="GP31 Social Banner"
            />

            <div className="flex justify-center gap-6 mt-2">
              {/* FACEBOOK */}
              <a href="https://www.facebook.com/GP31baseball" target="_blank">
                <svg
                  className="w-8 h-8 text-[#1877F2] hover:scale-110 transition"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.98 
                    3.66 9.1 8.44 9.87v-6.99H8.07v-2.88h2.37V9.41c0-2.34 
                    1.4-3.63 3.54-3.63 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 
                    0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.88h-2.18v6.99c4.78-.77 
                    8.43-4.89 8.43-9.87z" />
                </svg>
              </a>

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/gp31baseball/" target="_blank">
                <svg
                  className="w-8 h-8 text-[#E4405F] hover:scale-110 transition"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.75 2h8.5C19.55 2 22 4.46 22 7.75v8.5c0 3.29-2.46 
                    5.75-5.75 5.75h-8.5C4.46 22 2 19.54 2 16.25v-8.5C2 4.46 
                    4.46 2 7.75 2zm0 1.5A4.26 4.26 0 003.5 7.75v8.5A4.26 4.26 
                    0 007.75 20.5h8.5a4.26 4.26 0 004.25-4.25v-8.5A4.26 4.26 
                    0 0016.25 3.5h-8.5zM12 7.25a4.75 4.75 0 110 9.5 4.75 4.75 
                    0 010-9.5zm5.38-.75a1.13 1.13 0 11-2.26 
                    0 1.13 1.13 0 012.26 0z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Perfect Game Team Page */}
<div
  className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg 
             text-center transition-all duration-300 hover:-translate-y-1 
             hover:shadow-[0_0_25px_#FFD700]"
>
  <h3 className="text-xl font-semibold text-[#FFD700] mb-2">
    Perfect Game Team Page
  </h3>

  <p className="text-gray-300 text-sm mb-4">
    View GP31’s official PGBA team profile, tournament history, roster, and rankings.
  </p>

  <a
    href="https://www.perfectgame.org/PGBA/Team/default.aspx?orgid=31822&orgteamid=266502&team=1016525&Year=2026"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-[#FFD700] text-[#0A1A3F] font-semibold 
               py-2 px-5 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.4)] 
               hover:bg-amber-300 hover:scale-105 transition-all"
  >
    → Visit Perfect Game Profile
  </a>
</div>


          {/* Last Updated */}
          <p className="text-gray-400 italic text-xs text-center">
            Last updated: {lastUpdated}
          </p>
        </motion.div>


       </motion.section>
    </div>
  );
}

function StatBox({ title, statList, statKey, icon }) {
  const showMinABNote = title === "Batting Avg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg
                 hover:shadow-[0_0_15px_#FFD700] transition-all duration-300
                 transform hover:-translate-y-1"
    >
      <div className="flex items-center mb-2">
        {icon && <div className="text-[#FFD700] mr-2">{icon}</div>}
        <h3 className="text-xl font-semibold text-[#FFD700]">{title}</h3>
      </div>

      {showMinABNote && (
        <p className="text-[#FFD700] italic text-xs mb-2">* Min 10 AB to qualify</p>
      )}

      {statList.length > 0 ? (
        statList.map((p, i) => {
          const isLeader = i === 0;

          const value =
            statKey === "avg" ? p.displayAvg : parseInt(p[statKey]);

          return (
            <p
              key={i}
              className={`flex justify-between border-b border-gray-700 py-1 text-sm ${
                isLeader ? "bg-[#FFD700]/10 rounded-lg font-bold" : ""
              }`}
            >
              <span>{i + 1}. {p.name}</span>

              <span
                className={
                  isLeader
                    ? "font-semibold text-[#FFD700] drop-shadow-[0_0_6px_#FFD700]"
                    : "font-semibold text-gray-200"
                }
              >
                {statKey === "avg" ? (
                  value
                ) : (
                  <CountUp start={0} end={value} duration={1.4} separator="," />
                )}
              </span>
            </p>
          );
        })
      ) : (
        <p className="text-gray-400 italic text-sm">Not enough data yet.</p>
      )}
    </motion.div>
  );
}

/***************  EOF  ***************/
