import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Baseball } from "lucide-react"; // stylized baseball icon

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 0);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#D4AF37] shadow-lg flex items-center justify-center hover:shadow-[#FFD700]/60 transition-all duration-300"
    >
      <Baseball className="text-[#0A1A3F]" size={28} />
    </motion.button>
  );
}
