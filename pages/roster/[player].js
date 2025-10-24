import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { players } from "../../data/players";

export default function PlayerPage() {
  const router = useRouter();
  const { player } = router.query;

  const playerData = players.find(
    (p) => p.name.toLowerCase() === player?.toLowerCase()
  );

  if (!playerData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-[#0A1A3F] to-[#07132F]">
        <h1 className="text-4xl font-bold text-[#FFD700] mb-4">Player Not Found</h1>
        <Link
          href="/roster"
          className="text-[#FFD700] border border-[#FFD700] px-6 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#0A1A3F] transition"
        >
          Back to Roster
        </Link>
      </div>
    );
  }

  const { name, number, image, profileImage, position, batsThrows, favorites } =
    playerData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center px-6 pb-20">
      {/* Header */}
      <header className="text-center mt-8 mb-4">
        {/* 💎 Gold shine header effect */}
        <h1 className="text-5xl font-bold gold-shine drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] mb-2">
          #{number} {name}
        </h1>
        <p className="text-gray-300 italic text-sm">GP31 Baseball 11U</p>
      </header>

      {/* Massive Hero Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-[850px] mb-10"
      >
        {/* Soft spotlight background */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FFD700]/20 via-transparent to-transparent blur-2xl"></div>

        <div className="relative rounded-3xl overflow-hidden border-4 border-[#D4AF37] shadow-[0_0_60px_rgba(212,175,55,0.5)]">
          <Image
            src={profileImage || image || "/gp31-logo.png"}
            alt={name}
            width={900}
            height={900}
            priority
            className="w-full h-auto object-cover object-top"
          />
        </div>
      </motion.div>

      {/* Player Info / Bio */}
      <div className="bg-[#10224F]/90 border-2 border-[#D4AF37] rounded-2xl shadow-lg p-8 w-full max-w-[850px]">
        <div className="text-center mb-6">
          <p className="text-[#FFD700] text-2xl font-semibold mb-1">{position}</p>
          <p className="text-gray-300 text-sm italic">B/T: {batsThrows}</p>
        </div>

        {/* Enhanced Favorites Box */}
        <div className="relative bg-[#0F1E3E]/95 border-2 border-[#D4AF37] rounded-xl w-full text-left p-6 space-y-4 shadow-[0_0_25px_rgba(212,175,55,0.25)] overflow-hidden">
          {/* Faint moving gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent animate-[shine_8s_linear_infinite]" />
          
          <div className="relative z-10">
            <p>
              <span className="text-gray-400 font-semibold">Favorite Position:</span>{" "}
              <span className="text-[#FFD700]">{favorites.position}</span>
            </p>
            <p>
              <span className="text-gray-400 font-semibold">Favorite MLB Player:</span>{" "}
              <span className="text-[#FFD700]">{favorites.mlbPlayer}</span>
            </p>
            <p>
              <span className="text-gray-400 font-semibold">Favorite MLB Team:</span>{" "}
              <span className="text-[#FFD700]">{favorites.mlbTeam}</span>
            </p>
            <p>
              <span className="text-gray-400 font-semibold">Favorite Food:</span>{" "}
              <span className="text-[#FFD700]">{favorites.food}</span>
            </p>
            <p className="italic text-[#FFD700]/90 border-t border-[#D4AF37]/40 pt-3 text-center">
              “{favorites.quote}”
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link
          href="/roster"
          className="text-[#FFD700] border border-[#FFD700] px-6 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#0A1A3F] transition-all duration-300"
        >
          ← Back to Roster
        </Link>
      </div>
    </div>
  );
}
