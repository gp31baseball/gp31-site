import { useEffect, useState } from "react";
import { Trophy, Star, Zap, Medal, Crown } from "lucide-react";
import Papa from "papaparse";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function Home() {
  const [leaders, setLeaders] = useState({ hr: [], avg: [], sb: [] });
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    try {
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
    } catch (err) {
      console.warn("GameChanger widget load failed:", err);
    }
  }, []);

  useEffect(() => {
    fetch("/data/team_stats.csv")
      .then((res) => res.text())
      .then((csvText) => {
        setLastUpdated(new Date().toLocaleString());
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim().toLowerCase(),
          beforeFirstChunk: (chunk) => {
            const lines = chunk.split(/\r\n|\n/);
            const headerIndex = lines.findIndex((line) =>
              line.toLowerCase().startsWith("number,last,first")
            );
            return lines.slice(headerIndex).join("\n");
          },
          complete: (results) => {
            const rawPlayers = results.data
              .filter((p) => {
                const first = (p.first || p.First || "").trim();
                const last = (p.last || p.Last || "").trim();
                return (
                  first &&
                  !first.toLowerCase().includes("glossary") &&
                  !last.toLowerCase().includes("totals")
                );
              })
              .map((p) => {
                const keys = Object.keys(p).reduce((acc, key) => {
                  acc[key.trim().toLowerCase()] = p[key];
                  return acc;
                }, {});
                const ab = parseInt(keys.ab || 0);
                const hits = parseInt(keys.h || 0);
                const hr = parseInt(keys.hr || 0);
                const sb = parseInt(keys.sb || 0);
                const rawAvg =
                  keys.avg && !isNaN(parseFloat(keys.avg))
                    ? parseFloat(keys.avg)
                    : ab > 0
                    ? hits / ab
                    : 0;
                const formattedAvg =
                  rawAvg > 0 ? `.${rawAvg.toFixed(3).split(".")[1]}` : ".000";
                return {
                  name: (keys.first || "").trim(),
                  ab,
                  hits,
                  hr,
                  sb,
                  avg: parseFloat(rawAvg.toFixed(3)),
                  displayAvg: formattedAvg,
                };
              });
            const batters = rawPlayers.filter((p) => p.ab > 10);
            const hrLeaders = [...batters]
              .filter((p) => p.hr > 0)
              .sort((a, b) => b.hr - a.hr)
              .slice(0, 5);
            const avgLeaders = [...batters]
              .sort((a, b) => b.avg - a.avg)
              .slice(0, 5);
            const sbLeaders = [...rawPlayers]
              .filter((p) => p.sb > 0)
              .sort((a, b) => b.sb - a.sb)
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    show: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center overflow-x-hidden">
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center mt-8 mb-8"
      >
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
      </motion.header>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="bg-white text-center py-12 px-4 md:px-12 w-full mb-10 rounded-none"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#D4AF37] glow-gold-text mb-4">
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
      </motion.section>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 w-full max-w-7xl px-6 pb-16"
      >
        {/* Coaches Box */}
        <motion.div
          variants={fadeUp}
          className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <Medal className="text-[#D4AF37] mr-2" />
            <h2 className="text-2xl font-semibold text-[#FFD700] glow-gold-text">
              About Coaches
            </h2>
          </div>
          {coaches.map((coach, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className="mb-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-[#D4AF37] object-cover"
              />
              <p className="text-lg font-bold text-[#FFD700]">{coach.name}</p>
              <p className="text-gray-200 text-sm leading-relaxed">
                {coach.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Middle Column */}
        <motion.div variants={fadeUp} className="flex flex-col space-y-6">
          {/* Championship Image */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg text-center"
          >
            <img
              src="/gallery/champs.jpg"
              alt="Championship Team"
              className="rounded-lg border-4 border-[#D4AF37] shadow-xl object-cover w-full max-w-[800px] mx-auto"
              onError={(e) => (e.currentTarget.src = "/gp31-logo.png")}
            />
            <p className="text-[#FFD700] italic mt-3 text-sm">
              2025 11U PGBA Gold Cup Classic Champions — Houston, TX
            </p>
          </motion.div>

          {/* GameChanger Widget */}
          <motion.div
            variants={fadeUp}
            className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-6 shadow-lg min-h-[720px] flex flex-col justify-start"
          >
            <div className="flex items-center mb-4 justify-center">
              <Trophy className="text-[#D4AF37] mr-2" />
              <h2 className="text-2xl font-semibold text-[#FFD700] glow-gold-text">
                Recent Games
              </h2>
            </div>
            <div
              id="gc-schedule-widget-yduq"
              className="border-2 border-[#D4AF37] rounded-xl p-4 bg-[#0F1E3E] shadow-md w-full h-full"
            ></div>
          </motion.div>
        </motion.div>

        {/* Stats + Romans Box Column */}
        <motion.div variants={fadeUp} className="space-y-6">
          <StatBox title="Home Runs" statList={leaders.hr} statKey="hr" icon={<Crown />} />
          <StatBox title="Batting Avg" statList={leaders.avg} statKey="avg" icon={<Star />} />
          <StatBox title="Stolen Bases" statList={leaders.sb} statKey="sb" icon={<Zap />} />

         {/* ✝️ GP31 Faith Banner Box */}
<div className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_#FFD700] transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex justify-center items-center">
  <img
    src="/gallery/social-preview.jpg"
    alt="GP31 Faith Family Baseball Banner"
    className="rounded-lg border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(255,215,0,0.3)] w-full h-auto max-w-[350px] object-contain"
  />
</div>


          <p className="text-gray-400 italic text-xs text-center mt-3">
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
      className="bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-4 shadow-lg hover:shadow-[0_0_15px_#FFD700] transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="flex items-center mb-2">
        {icon && <div className="text-[#FFD700] mr-2">{icon}</div>}
        <h3 className="text-xl font-semibold text-[#FFD700] glow-gold-text">
          {title}
        </h3>
      </div>

      {showMinABNote && (
        <p className="text-[#FFD700] italic text-xs mb-2">* Min 10 AB to qualify</p>
      )}

      {statList.length > 0 ? (
        statList.map((p, i) => {
          const isLeader = i === 0;
          const value =
            statKey === "avg"
              ? parseFloat(p.displayAvg)
              : parseInt(p[statKey]);

          return (
            <p
              key={i}
              className={`flex justify-between border-b border-gray-700 py-1 text-sm ${
                isLeader ? "bg-[#FFD700]/10 rounded-lg font-bold" : ""
              }`}
            >
              <span>{i + 1}. {p.name}</span>
              <span
                className={`font-semibold ${
                  isLeader
                    ? "text-[#FFD700] drop-shadow-[0_0_6px_#FFD700]"
                    : "text-gray-200"
                }`}
              >
                {statKey === "avg" ? (
                  p.displayAvg
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
