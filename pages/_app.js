import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <script src="http://localhost:3001/norad-tracker.js" defer />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
