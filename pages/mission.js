import { Heart } from "lucide-react";

export default function Mission() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white px-6 pb-20">
      <div className="flex items-center mt-10 mb-6">
        <Heart className="text-[#D4AF37] mr-3" size={36} />
        <h1 className="text-4xl font-bold text-[#FFD700]">Our Mission</h1>
      </div>

      <div className="max-w-3xl text-center bg-[#10224F] border-2 border-[#D4AF37] rounded-xl p-8 shadow-lg">
        <p className="text-lg text-gray-200 leading-relaxed mb-6">
          <strong className="text-[#FFD700]">GP31 Baseball</strong> exists to develop young athletes not only in
          their skills, but in their character, discipline, and faith. We play
          for a higher purpose — to glorify God through effort, sportsmanship,
          and teamwork.
        </p>

        <p className="text-lg text-gray-200 leading-relaxed">
          Romans 8:31 reminds us:{" "}
          <span className="italic text-[#FFD700]">
            “If God is for us, who can be against us?”
          </span>{" "}
          — a promise that defines who we are on and off the field.
        </p>
      </div>
    </div>
  );
}
