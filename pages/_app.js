import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <script src="/norad-tracker.js" defer />

      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
