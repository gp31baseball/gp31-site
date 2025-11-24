import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";   // ← ADD THIS

export default function App({ Component, pageProps }) {
  return (
    <>
      <script src="/norad-tracker.js" defer />

      <Navbar />
      <Component {...pageProps} />

      <Analytics />   {/* ← REQUIRED for Vercel Analytics (Pages Router) */}
    </>
  );
}
