import { useRouter } from "next/router";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
 const router = useRouter();

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
          </>
  );
}
