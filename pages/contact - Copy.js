import { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    position: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // placeholder for EmailJS
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", phone: "", age: "", position: "", message: "" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A1A3F] overflow-hidden text-white px-6 pb-20">
      {/* Parallax Watermark */}
      <div className="absolute inset-0 opacity-10 z-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/watermark.png')" }}></div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-2xl">
        <h1 className="text-5xl font-bold text-[#D4AF37] text-center mb-2 drop-shadow-lg">
          Join the GP31 Family
        </h1>
        <p className="text-xl italic text-gray-300 text-center mb-10">
          “If God is for us, who can be against us” — Romans 8:31
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#10224F]/90 p-8 rounded-xl shadow-xl border border-[#D4AF37] space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-[#0A1A3F] border border-[#D4AF37]/40 focus:border-[#FFD700] focus:ring-[#FFD700] focus:ring-1 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-[#0A1A3F] border border-[#D4AF37]/40 focus:border-[#FFD700] focus:ring-[#FFD700] focus:ring-1 outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#0A1A3F] border border-[#D4AF37]/40 focus:border-[#FFD700] focus:ring-[#FFD700] focus:ring-1 outline-none"
          />
          <input
            type="number"
            name="age"
            placeholder="Player Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#0A1A3F] border border-[#D4AF37]/40 focus:border-[#FFD700] focus:ring-[#FFD700] focus:ring-1 outline-none"
          />
          <input
            type="text"
            name="position"
            placeholder="Preferred Position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#0A1A3F] border border-[#D4AF37]/40 focus:border-[#FFD700] focus:ring-[#FFD700] focus:ring-1 outline-none"
          />
          <textarea
            name="message"
            placeholder="Tell us about the player..."
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-3 rounded-md bg-[#0A1A3F] border border-[#D4AF37]/40 focus:border-[#FFD700] focus:ring-[#FFD700] focus:ring-1 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-[#0A1A3F] font-bold py-3 rounded-md hover:bg-[#FFD700] transition duration-300"
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <div className="mt-6 text-center text-[#FFD700] font-semibold text-xl animate-pulse">
            ✅ Welcome to the GP31 Family!
          </div>
        )}
      </div>
    </div>
  );
}
