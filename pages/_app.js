import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import ScrollTop from "@/components/ScrollTop";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ScrollTop />
    </>
  );
}
